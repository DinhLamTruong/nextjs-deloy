import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const uri =
      'mongodb+srv://truongdlfx22577:xTIeffAM3olWtmm6@cluster0.nyndcmn.mongodb.net/meetups?retryWrites=true&w=majority';
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
