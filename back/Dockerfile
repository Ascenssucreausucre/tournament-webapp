FROM node:20-alpine

WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Expose le port que l'app écoute
EXPOSE 4000

# Commande par défaut au démarrage du conteneur
CMD ["npm", "run", "dev"]
