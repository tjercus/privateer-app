import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
//
import { lastUrlSegment } from "../common/utils";
//
import ModalContainer from "../features/modal/ModalContainer";
import { HeaderView } from "../features/other/HeaderView";
import { PlanetListContainer } from "../features/planet/PlanetListContainer";
import { SpaceshipListContainer } from "../features/spaceship/SpaceshipListContainer";
import { HomeView } from "../features/other/HomeView";
import { PlanetFormContainer } from "../features/planet/PlanetFormContainer";
import { SpaceshipEditFormContainer } from "../features/spaceship/SpaceshipEditFormContainer";
import { SpaceshipCreateFormContainer } from "../features/spaceship/SpaceshipCreateFormContainer";
import { HardwareListContainer } from "../features/hardware/HardwareListContainer";
import { HardwareFormContainer } from "../features/hardware/HardwareFormContainer";

const App = () => {
  let { pathname } = useLocation();
  const urlId = lastUrlSegment(pathname);

  return (
    <>
      <ModalContainer />
      <HeaderView />
      <main className="container-fluid content-holder" id="content-holder">
        <Routes>
          <Route index element={<HomeView />} />

          <Route path="/hardware" element={<HardwareListContainer />} />
          <Route path="/hardware/create" element={<HardwareFormContainer />} />
          <Route
            path="/hardware/edit/:hardwareId"
            element={<HardwareFormContainer hardwareId={urlId} />}
          />

          <Route path="/planet" element={<PlanetListContainer />} />
          <Route path="/planet/create" element={<PlanetFormContainer />} />
          <Route
            path="/planet/edit/:planetId"
            element={<PlanetFormContainer planetId={urlId} />}
          />

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
