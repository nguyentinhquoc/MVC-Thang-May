FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port (thay đổi nếu app của bạn dùng port khác)
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]