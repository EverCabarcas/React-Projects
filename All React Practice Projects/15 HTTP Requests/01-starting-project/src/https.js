export async function getUserPlaces() {
  const url = "http://localhost:3000/places";
  const response = await fetch(url);
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error("fallo");
  }

  return responseJson.places;
}

export async function FetchUserPlaces() {
  const url = "http://localhost:3000/user-places";
  const response = await fetch(url);
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error("fallo");
  }

  return responseJson.places;
}


export async function updateUserPlaces(places) {
  console.log(places)
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = response.json();

  if (!response.ok) {
    throw new Error("errrorrr");
  }

  return responseData.message;
}

