import React from "react";
import { Link } from "react-router-dom";
import { Table } from "@vismaux/react-nc4";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
//
import { hasValue } from "../../common/utils";
import { ID, Spaceship } from "../../domain/types";
//
import { SpaceshipRowView } from "./SpaceshipRowView";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined;
  events: { handleDeleteButtonClick: (spaceshipId: ID) => void }; // TODO extract TYPE
  isLoading: boolean;
  spaceships?: Array<Spaceship>;
}

export const SpaceshipListView = ({
  error,
  events,
  isLoading,
  spaceships,
}: Props) =>
  hasValue(error) ? (
    <div>{error?.toString()}</div>
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
              events={events}
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
