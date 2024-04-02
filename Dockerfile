FROM node:18.19.0-alpine

WORKDIR /app

# Copie os arquivos de configuração e instale as dependências
COPY package*.json ./

COPY .env /.

RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Executar o comando npm run build
RUN npm run build

# Defina as variáveis de ambiente
ARG DB_HOST=db
ENV DB_HOST=$DB_HOST

# Defina a porta na qual a aplicação Nest.js será executada (você pode alterar esta porta conforme necessário)
ENV PORT=3000

# Exponha a porta 3000 para fora do contêiner
EXPOSE $PORT

# Comando para iniciar a aplicação
CMD ["npm", "start"]