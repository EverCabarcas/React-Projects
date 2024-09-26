import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { getUserPlaces } from "../https.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsLoading(true);

        const places = await getUserPlaces();

        // navigator.geolocation.getCurrentPosition((position)=> {
        //   const sortedPlaces = sortPlacesByDistance(responseJson.places, position.coords.latitude, position.coords.longitude)

        // })
        setAvailablePlaces(places);
        setIsLoading(false);
      } catch (error) {
        setError({ message: error.message || "could not fecth messages " });
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Error ocurr" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
