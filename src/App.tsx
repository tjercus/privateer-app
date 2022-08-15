import React from "react";
import "./App.css";
import {Header} from "./features/other/Header";
import {PlanetFormContainer} from "./features/planet/PlanetFormContainer";
import {ID} from "./domain/types";

const planetId: ID = "abc-123" as ID;

const App = () => (
  <>
    <Header/>
    <main className="container-fluid content-holder" id="content-holder">
      <PlanetFormContainer planetId={planetId} />
    </main>
  </>
);

export default App;
