import { Suspense, useEffect, useState } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();
  //   if(data.isError){
  //     return <p>{data.message}</p>
  //   }
  // const events = data.events;
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [fetchedEvents, setFetchedEvents] = useState();
  //   const [error, setError] = useState();

  //   useEffect(() => {
  //     async function fetchEvents() {
  //       setIsLoading(true);
  //     //   const response = await fetch('http://localhost:8080/events');

  //     //   if (!response.ok) {
  //     //     setError('Fetching events failed.');
  //     //   } else {
  //     //     const resData = await response.json();
  //     //     setFetchedEvents(resData.events);
  //     //   }
  //       setIsLoading(false);
  //     }

  //     fetchEvents();
  //   }, []);
  // return (
  //   <>
  //     {/* <div style={{ textAlign: 'center' }}>
  //       {isLoading && <p>Loading...</p>}
  //       {error && <p>{error}</p>}
  //     </div> */}
  //     {/* <EventsList events={events} /> */}
  //   </>
  // );

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );

  
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Error'}
    // throw new Response(JSON.stringify({message: 'error-yesss'}),  {status: 500})
    throw json({ message: "error-yesss" }, { status: 500 });
  } else {
    const resData = await response.json()
    return resData.events;
  }
}
export function EventLoader() {
  return defer({
    events: loadEvents(),
  });
}
