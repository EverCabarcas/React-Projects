import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return <EventForm method="post" />;
}

export async function newEventAction({ request }) {
  const form = await request.formData();
  const data = {
    title: form.get("title"),
    image: form.get("image"),
    date: form.get("date"),
    description: form.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "error sending" }, { status: 500 });
  }

  //ALWAYS NEED TO RETURN SOMETHING

  return redirect("/events");
}
