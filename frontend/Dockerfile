FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# In a real scenario, you'd build for production
# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
