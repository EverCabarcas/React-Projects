import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong while sending the request"
    );
  }

  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  function clearData(){
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsloading(true);
      try {
        const restData = await sendHttpRequest(url, {...config, body: data});
        setData(restData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
        setIsloading(false);
      }

      setIsloading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method)) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
