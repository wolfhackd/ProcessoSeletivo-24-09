type SimulationWithRelations = any;
export function calculateProjection(simulation: SimulationWithRelations, status: string): any[] {
  const PROJECTION_END_YEAR = 2060;
  const initialDate = simulation.startDate;
  const currentYear = initialDate.getFullYear();
  const realRate = simulation.realRate;

  const projectionResults: any[] = [];

  let initialNetWorth = 0;

  for (const asset of simulation.allocations) {
    const latestRecord = asset.records
      .filter((r: any) => r.date <= initialDate)
      .sort((a: any, b: any) => b.date.getTime() - a.date.getTime())[0]; // Mais recente

    if (latestRecord) {
      initialNetWorth += latestRecord.value;
    }
  }

  let currentNetWorth = initialNetWorth;

  for (let year = currentYear; year <= PROJECTION_END_YEAR; year++) {
    let startOfYearWorth = currentNetWorth;

    let compoundedGrowth = startOfYearWorth * realRate;
    currentNetWorth += compoundedGrowth;

    let netMovements = 0;

    for (const movement of simulation.movements) {
      if (
        movement.startDate.getFullYear() <= year &&
        (!movement.endDate || movement.endDate.getFullYear() >= year)
      ) {
        const annualContribution = calculateAnnualMovementValue(movement);
        netMovements += annualContribution;
      }
    }
    currentNetWorth += netMovements;

    let insuranceImpact = 0;

    if (status === 'Vivo') {
      for (const insurance of simulation.insurances) {
        if (
          insurance.startDate.getFullYear() <= year &&
          insurance.startDate.getFullYear() + Math.ceil(insurance.durationMonths / 12) > year
        ) {
          insuranceImpact -= insurance.premium * 12;
        }
      }
    } else if (status === 'Morto' && year === currentYear) {
      for (const insurance of simulation.insurances) {
        insuranceImpact += insurance.insuredValue;
      }
    }

    currentNetWorth += insuranceImpact;

    projectionResults.push({
      year: year,
      netWorthStart: startOfYearWorth,
      netWorthEnd: currentNetWorth,
      growth: compoundedGrowth,
      movements: netMovements,
      insuranceImpact: insuranceImpact,
    });
  }

  return projectionResults;
}

function calculateAnnualMovementValue(movement: any): number {
  switch (movement.frequency) {
    case 'Mensal':
      return movement.value * 12;
    case 'Trimestral':
      return movement.value * 4;
    case 'Anual':
      return movement.value;
    case 'Única':
      return movement.startDate.getFullYear() === new Date().getFullYear() ? movement.value : 0;
    default:
      return 0;
  }
}
