import {
  Await,
  defer,
  json,
  redirect,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: "no details" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Error'}
    // throw new Response(JSON.stringify({message: 'error-yesss'}),  {status: 500})
    throw json({ message: "error-yesss" }, { status: 500 });
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData.events;
  }
}

export async function loader({ request, params }) {
  return defer({
    event: await loadEvent(params.eventId),
    events: loadEvents(),
  });
}

// export async function EventDetailPageLoader({ request, params }) {
//   const eventId = params.eventId;
//   const response = await fetch(`http://localhost:8080/events/${eventId}`);

//   if (!response.ok) {
//     throw json({ message: "no details" }, { status: 500 });
//   } else {
//     return response;
//   }
// }

export async function eventDetailPageDeleteAction({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw json({ message: "no details" }, { status: 500 });
  }

  return redirect("/events");
}
