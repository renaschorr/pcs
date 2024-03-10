const { MongoClient } = require('mongodb');

async function main() {
  const uri = 'mongodb+srv: my code yadaaa'; // Connection URI
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('myDatabase');
    const collection = database.collection('myCollection');

    
    await collection.insertOne({ name: 'John', age: 30 });
    await collection.insertMany([{ name: 'Jane', age: 25 }, { name: 'Doe', age: 40 }]);

    // Find documents
    const john = await collection.findOne({ name: 'John' });
    console.log(john);

    // Update documents
    await collection.updateOne({ name: 'Jane' }, { $set: { age: 26 } });

    // Delete documents
    await collection.deleteOne({ name: 'Doe' });
  } finally {
    await client.close();
  }
}

main().catch(console.error);
