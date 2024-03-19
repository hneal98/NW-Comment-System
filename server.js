const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = process.env.NealsWebsites_Mongodb_URI;

// Handler for get-comments function
async function getCommentsHandler(event, context) {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('nealswebsitesdb');
    const collection = db.collection('comments');

    if (event.httpMethod === 'GET') {
      const comments = await collection.find({ approved: { $regex: /^yes$/i } }).toArray();

      return {
        statusCode: 200,
        body: JSON.stringify(comments),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}

// Handler for submit-comments function
async function submitCommentsHandler(event, context) {
  try {
    // Implement submit-comments handler logic here

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Comment submitted successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}

// Export the handlers
module.exports = {
  getCommentsHandler,
  submitCommentsHandler,
};