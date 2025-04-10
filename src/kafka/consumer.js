const { Kafka } = require('kafkajs');
const dbService = require('../services/dbService');
const cacheService = require('../services/cacheService');

const kafka = new Kafka({
  clientId: 'event-app-consumer',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'event-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
        console.log("listening from consumer")
      const data = JSON.parse(message.value.toString());
      console.log('📥 Consumed:', data);

      // Save to DB
      await dbService.saveEvent(data);
    }
  });
};

module.exports = { runConsumer };
