import { Link } from "react-router-dom";

export default function EventsPage() {
  const EVENTS = [
    {
      id: "e1",
      title: "event 1",
    },
    { id: "e2", title: "event 2" },
    { id: "e3", title: "event 3" },
    { id: "e4", title: "event 4" },
  ];
  return (
    <>
      <h1>EventsPage</h1>
      <ul>
        {EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              <p>{event.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
