import React from "react";
import { Link } from "react-router-dom";
import {Alert, Table} from "@vismaux/react-nc4";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
//
import { hasValue } from "../../common/utils";
import { ID } from "../../domain/general";
import { Spaceship } from "../../domain/types";
//
import { SpaceshipRowView } from "./SpaceshipRowView";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined; // TODO extract type
  eventHandlers: { handleDeleteButtonClick: (spaceshipId: ID) => void }; // TODO extract TYPE
  isLoading: boolean;
  spaceships?: Array<Spaceship>;
}

export const SpaceshipListView = ({
  error,
  eventHandlers,
  isLoading,
  spaceships,
}: Props) =>
  hasValue(error) ? (
    <Alert type="danger">{"There was an error fetching the list of spaceships"}</Alert>
  ) : (
    <article>
      <h1>{"Spaceships"}</h1>
      <Table data-test={"table-list-spaceship"}>
        <thead>
          <tr>
            <th>{"Name"}</th>
            <th>{"Landed on"}</th>
            <th>{"Type"}</th>
            <th>{"Armour"}</th>
            <th>{"Weapons"}</th>
            <th>{"Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {spaceships?.map((spaceship) => (
            <SpaceshipRowView
              events={eventHandlers}
              isLoading={isLoading}
              key={spaceship.id}
              spaceship={spaceship}
            />
          ))}
        </tbody>
      </Table>

      <Link to={"/spaceship/create"}>
        <button
          type="button"
          className="btn btn-primary"
          data-test={"btn-add-spaceship"}
        >
          {"Add a spaceship"}
        </button>
      </Link>
    </article>
  );
