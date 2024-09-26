import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request, params }) {
  const searchParams = new URL(request.url).searchParams;
  const form = await request.formData();

  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "modo no soportado" }, { status: 422 });
  }
  const data = {
    email: form.get("email"),
    password: form.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "failed login" }, { status: 500 });
  }

  const resData = await response.json();

  const token = resData.token;


  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1)
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect("/");
}
