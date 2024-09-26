import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../../components/meetups/MeetupDetail";
import Head from "next/head";

export default function MeetupDetails({meetupData}) {
  return (
    <>
    <Head>
      <title>{meetupData.title}</title>
      <meta name="description" content={meetupData.description}></meta>
    </Head>
    <MeetupDetail
      image={meetupData.image}
      title={meetupData.title}
      address={meetupData.address}
      description={meetupData.description}
    />
    </>
  );
}

export async function getStaticPaths() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://evercabarcas:tlqkGltYp5gEHWdl@meetup.lsnuz.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}
export async function getStaticProps(context) {
  // fetch data from an single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://evercabarcas:tlqkGltYp5gEHWdl@meetup.lsnuz.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const objectId = new ObjectId(meetupId);

  const meetup = await meetupsCollection.findOne({ _id: objectId });

  client.close();

  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
      },
    },
  };
}
