import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const uri =
      'mongodb+srv://lamtruong:SkOAXtwWaaEXEmg9@cluster0.nyndcmn.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0';
    const client = await MongoClient.connect(uri);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: 'Meetups Inserted!' });
  }
}

export default handler;
