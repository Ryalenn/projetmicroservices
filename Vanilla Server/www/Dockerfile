
FROM node:14


WORKDIR /app


COPY package.json ./
COPY package-lock.json ./
COPY index.js ./
COPY /data ./data  


RUN npm install


EXPOSE 3000


CMD ["node", "index.js"]
