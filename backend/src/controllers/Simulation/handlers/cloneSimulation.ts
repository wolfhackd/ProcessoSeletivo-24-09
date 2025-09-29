import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../../prisma';
import { NewSimulationData } from '../simulation.schema';

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export async function cloneSimulation(
  originalId: number,
  newSimulationData: NewSimulationData,

  client?: TransactionClient,
) {
  const db = client ?? prisma;

  const originalSimulationWithRelations = await db.simulation.findUnique({
    where: { id: originalId },
    include: {
      allocations: {
        include: { records: true },
      },
      movements: true,
      insurances: true,
    },
  });

  if (!originalSimulationWithRelations) {
    throw new Error(`Simulação original com ID ${originalId} não encontrada.`);
  }

  const newSim = await db.simulation.create({
    data: {
      name: newSimulationData.name,
      startDate: newSimulationData.startDate,
      realRate: newSimulationData.realRate,
      status: newSimulationData.status,
      version: newSimulationData.version,
      originalId: newSimulationData.originalId,
      isCurrent: newSimulationData.isCurrent ?? false,
      isLegacy: false,
    },
  });

  for (const originalAsset of originalSimulationWithRelations.allocations) {
    const newAsset = await db.asset.create({
      data: {
        simulationId: newSim.id,
        name: originalAsset.name,
        assetType: originalAsset.assetType,
      },
    });

    for (const originalRecord of originalAsset.records) {
      await db.assetRecord.create({
        data: {
          assetId: newAsset.id,
          value: originalRecord.value,
          date: originalRecord.date,
          isFinanced: originalRecord.isFinanced,
          financeDetails: (originalRecord.financeDetails as Prisma.JsonValue) ?? Prisma.JsonNull,
        },
      });
    }
  }

  for (const originalMovement of originalSimulationWithRelations.movements) {
    await db.movement.create({
      data: {
        simulationId: newSim.id,
        type: originalMovement.type,
        description: originalMovement.description,
        value: originalMovement.value,
        frequency: originalMovement.frequency,
        startDate: originalMovement.startDate,
        endDate: originalMovement.endDate,
      },
    });
  }

  for (const originalInsurance of originalSimulationWithRelations.insurances) {
    await db.insurance.create({
      data: {
        simulationId: newSim.id,
        name: originalInsurance.name,
        startDate: originalInsurance.startDate,
        durationMonths: originalInsurance.durationMonths,
        premium: originalInsurance.premium,
        insuredValue: originalInsurance.insuredValue,
      },
    });
  }

  return newSim;
}
