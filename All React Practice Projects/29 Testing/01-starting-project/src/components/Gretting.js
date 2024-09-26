import { useState } from "react";
import Output from "./Output";

export default function Greeting() {
  const [changeText, setChangeText] = useState(false);
  const changeTextHandler = () => {
    setChangeText(true);
  };
  return (
    <div>
      <h1>Hello World</h1>
      {!changeText && (
        <Output>
          {" "}
          <p>Welcome to my first React app</p>{" "}
        </Output>
      )}
      {changeText && (
        <Output>
          {" "}
          <p>Changed</p>{" "}
        </Output>
      )}
      <button onClick={changeTextHandler}>Change Text!</button>
    </div>
  );
}
