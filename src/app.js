require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')
const routes = require('./routes');
const { runConsumer } = require('./kafka/consumer');
const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, 'application.log'), { flags: 'a' });

app.use(morgan('dev')); 
app.use(morgan('combined', { stream: logStream }));

app.use(express.json());
app.use('/api', routes);
console.log("hello")

// Start Kafka consumer
runConsumer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
