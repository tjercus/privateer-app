import React from "react";
import { HeaderView } from "./features/other/HeaderView";
import { Route, Routes, useLocation } from "react-router-dom";
import { PlanetListContainer } from "./features/planet/PlanetListContainer";
import { SpaceshipListContainer } from "./features/spaceship/SpaceshipListContainer";
import { HomeView } from "./features/other/HomeView";
import { PlanetFormContainer } from "./features/planet/PlanetFormContainer";
import {lastUrlSegment} from "./app/utils";

const App = () => {
  let {pathname} = useLocation();
  const planetId = lastUrlSegment(pathname);

  return (
    <>
      <HeaderView />
      <main className="container-fluid content-holder" id="content-holder">
        <Routes>
          <Route index element={<HomeView />} />
          <Route path="/planet" element={<PlanetListContainer />} />
          <Route path="/planet/create" element={<PlanetFormContainer />} />
          <Route
            path="/planet/edit/:planetId"
            element={
              <PlanetFormContainer
                planetId={planetId}
              />
            }
          />
          <Route path="/spaceship" element={<SpaceshipListContainer />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
