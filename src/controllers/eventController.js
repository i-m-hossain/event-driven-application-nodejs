const { sendMessage } = require('../kafka/producer');
const {getCache} = require('../services/cacheService');
const db = require('../services/dbService');

const getUserEvent = async (req, res) => {
  const userId = req.params.userId;

  try {
    const data = await getCache({
      prefix: 'user',
      identifier: `${userId}:lastAction`,
      fallbackFn: async () => {
        const [rows] = await db.query(
          'SELECT * FROM events WHERE user_id = ? ORDER BY timestamp DESC LIMIT 1',
          [userId]
        );
        return rows[0] || null;
      },
    });

    if (!data) {
      return res.status(404).json({ message: 'No event found for this user.' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving user event:', error);
    res.status(500).json({ message: 'Failed to retrieve user event' });
  }
};

const publishEvent = async (req, res) => {
  const data = req.body;
  try {
    await sendMessage(data);
    res.status(200).json({ message: 'Event published to Kafka successfully' });
  } catch (error) {
    console.error('Error publishing event:', error);
    res.status(500).json({ message: 'Failed to publish event' });
  }
};



module.exports = {
  publishEvent,
  getUserEvent,
};
