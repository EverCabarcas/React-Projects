import logo from "./logo.svg";
import "./App.css";
import Greeting from "./components/Gretting";
// import Async from './components/Async';
import { lazy, Suspense } from "react";

const Async = lazy(() => import("./components/Async"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <Async />
      </Suspense>
    </div>
  );
}

export default App;
