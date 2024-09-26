import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
//     address: "Some address 5, 12345 Some City",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
//     address: "Some address 10, 12345 Some City",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image: "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
//     address: "Some address 15, 12345 Some City",
//   },
// ];
export default function Home(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse active react meetups"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) { // Despues del deploy se ejecuta en cada incoming request
//     //fetch data from an API
//     const {req, res} = context;

//     return {
//        props: {
//         meetups: DUMMY_MEETUPS
//        }
//     };
// }

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://evercabarcas:tlqkGltYp5gEHWdl@meetup.lsnuz.mongodb.net/"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
