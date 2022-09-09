import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
//
import { lastUrlSegment } from "./common/utils";
//
import ModalContainer from "./features/modal/ModalContainer";
import { HeaderView } from "./features/other/HeaderView";
import { PlanetListContainer } from "./features/planet/PlanetListContainer";
import { SpaceshipListContainer } from "./features/spaceship/SpaceshipListContainer";
import { HomeView } from "./features/other/HomeView";
import { SpaceshipEditFormContainer } from "./features/spaceship/SpaceshipEditFormContainer";
import { SpaceshipCreateFormContainer } from "./features/spaceship/SpaceshipCreateFormContainer";
import { PlanetEditFormContainer } from "./features/planet/PlanetEditFormContainer";
import { PlanetCreateFormContainer } from "./features/planet/PlanetCreateFormContainer";

const App = () => {
  let { pathname } = useLocation();
  const urlId = lastUrlSegment(pathname);

  return (
    <>
      <ModalContainer />
      <HeaderView />
      <main className="container content-holder" id="content-holder">
        <Routes>
          <Route index element={<HomeView />} />

          {/* planet */}
          <Route path="/planet" element={<PlanetListContainer />} />
          <Route
            path="/planet/create"
            element={<PlanetCreateFormContainer />}
          />
          <Route
            path="/planet/edit/:planetId"
            element={<PlanetEditFormContainer planetId={urlId} />}
          />

          {/* spaceship */}
          <Route path="/spaceship" element={<SpaceshipListContainer />} />
          <Route
            path="/spaceship/create"
            element={<SpaceshipCreateFormContainer />}
          />
          <Route
            path="/spaceship/edit/:spaceshipId"
            element={<SpaceshipEditFormContainer spaceshipId={urlId} />}
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
