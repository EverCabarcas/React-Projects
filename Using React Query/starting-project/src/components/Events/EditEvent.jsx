import {
  Link,
  redirect,
  useNavigate,
  useParams,
  useSubmit,
  useNavigation,
} from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { fetchEvent, queryClient, updateEvent } from "../../util/http.js";
import { useQuery } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  const { data, isError, error } = useQuery({
    queryKey: ["event", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
    staleTime: 10000 // para que no tenga que refrescar de una la peticion ya que cuando se aplica el loader ya tiene la ultima info y con esto aseguramos que no lo haga inmmediatamente carga la vista, maximilian dice que
    // useQuery busca la data que esta caching pero que tambien hace otra peticion segundaria para validar que la data que esta mandando de caching si es la ultima
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     await queryClient.cancelQueries({ queryKey: ["event", params.id] }); // para que haya clash de otras queries que se pueden estar haciendo
  //     const previousEvent = queryClient.getQueryData(["event", params.id]);
  //     queryClient.setQueryData(["event", params.id], newEvent);

  //     return { previousEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["event", params.id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["events"] });
  //   },
  //   // onSuccess: () => {  el no lo quiso hacer aqui para hacer el optimistic update
  //   //   queryClient.invalidateQueries({ queryKey: ['events']})
  //   //   navigate("../");
  //   // }
  // });

  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData }); LO VAMOS A HACER CON REACT-ROUTER + REACT-QUERY
    // navigate("../");
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to edit event."}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["event", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries({queryKey: ['event']});

  return redirect("../");
}
