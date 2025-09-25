# Build stage
FROM node:20 AS builder

WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build da aplicação Next
RUN npm run build

# Production stage
FROM node:20 AS runner

WORKDIR /app

# Copia apenas os arquivos necessários para rodar
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expõe a porta do Next
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
