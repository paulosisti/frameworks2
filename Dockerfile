# Escolha a imagem base do Node.js com o sistema operacional que você desejar
FROM node:14-alpine

# Crie e defina o diretório de trabalho para o aplicativo
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie o restante dos arquivos para o diretório de trabalho
COPY . .

# Exponha a porta do servidor
EXPOSE 3000

# Inicie o servidor
CMD ["npm", "start"]
