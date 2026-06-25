FROM node:20-alpine

WORKDIR /app

# Copy dependency configurations first to leverage Docker's layer caching
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your React TypeScript application files
COPY . .

EXPOSE 5173

# Expose the host network interface explicitly for container routing
CMD ["npm", "run", "dev"]
