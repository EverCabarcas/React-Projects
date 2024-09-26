// /api/new-meetup
import { MongoClient } from 'mongodb'
export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const { title, image, address, description } = data;
    
    const client = await MongoClient.connect('mongodb+srv://evercabarcas:tlqkGltYp5gEHWdl@meetup.lsnuz.mongodb.net/');
    const db = client.db();


    const meetupsCollection = db.collection('meetups');

    await meetupsCollection.insertOne({ title, image, address, description });

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
