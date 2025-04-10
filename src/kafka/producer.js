const { Kafka } = require('kafkajs');
const kafka = new Kafka({
  clientId: 'event-app',
  brokers: [process.env.KAFKA_BROKER],
  retry: {
    initialRetryTime: 300,
    retries: 10,
  }
});

const producer = kafka.producer();

const sendMessage = async (message) => {
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(message) }],
  });
  await producer.disconnect();
};

module.exports = { sendMessage };
