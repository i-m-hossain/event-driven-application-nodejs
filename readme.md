# 📡 Event-Driven Node.js App with Kafka, Redis, and Docker

This project is a simple event-driven architecture using:

- 🟢 Node.js (Express)
- 🧭 Kafka (via KafkaJS)
- 🐘 MySQL
- 🧰 Redis (with expiration logic)
- 🐳 Docker + Docker Compose
- 🧾 Morgan (for logging)
- 🔁 Nodemon (hot reloading)
- ❤️ Healthchecks and logs

---

## 📁 Project Structure

event-driven-app/

├── src/
│   ├── app.js
│   ├── kafka/
│   │   ├── producer.js
│   │   └── consumer.js
│   ├── routes/
│   │   └── index.js
│   ├── controllers/
│   │   └── eventController.js
│   ├── services/
│   │   ├── dbService.js
│   │   └── cacheService.js
├── mysql-init
│   ├── init.sql
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── .env
├── package.json
├── readme.md


## ⚙️ Features

- ✅ Event publishing via REST API
- ✅ Kafka producer/consumer architecture
- ✅ MySQL persistence
- ✅ Redis caching with expiration
- ✅ Morgan HTTP request logging
- ✅ Healthcheck endpoints
- ✅ Dockerized with all dependencies
- ✅ Nodemon for live reload

---

## 🚀 Usage

### 🔧 1. Set up `.env`

MYSQL_HOST=db
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DB=eventdb

KAFKA_BROKER=kafka:9092
REDIS_HOST=redis
REDIS_PORT=6379


### 🐳 Run with Docker
bash
Copy
docker-compose up -d --build


### 📤 Publish Event

curl -X POST http://localhost:3000/api/publish \
  -H "Content-Type: application/json" \
  -d '{"userId": 101, "action": "login", "timestamp": "2025-04-11T12:00:00"}'

### Query Events (from MySQL via API)

curl http://localhost:3000/api/events/101



👷 Future Improvements
- Add authentication/authorization
- Implement Kafka consumer retry logic
- Add UI dashboard for published events
- Add unit & integration tests
- Add kafdrop to view the kafka UI 