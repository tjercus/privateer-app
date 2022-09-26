import React from "react";
import { Link } from "react-router-dom";
import { Alert, Table } from "@vismaux/react-nc4";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
//
import { hasValue } from "../../common/utils";
import { Planet } from "../../domain/types";
//
import { PlanetRowView } from "./PlanetRowView";
import { ID } from "../../domain/general";

interface Props {
  error: FetchBaseQueryError | SerializedError | undefined; // TODO extract type
  eventHandlers: { handleDeleteButtonClick: (planetId: ID) => void }; // TODO extract TYPE
  isLoading: boolean;
  planets?: Array<Planet>;
}

export const PlanetListView = ({
  error,
  eventHandlers,
  isLoading,
  planets,
}: Props) =>
  hasValue(error) ? (
    <Alert type="danger">
      {"There was an error fetching the list of planets"}
    </Alert>
  ) : (
    <article>
      <h1>{"Planets"}</h1>
      <Table data-test={"table-list-planet"}>
        <thead>
          <tr>
            <th>{"Name"}</th>
            <th>{"Coordinates"}</th>
            <th>{"Actions"}</th>
          </tr>
        </thead>
        <tbody>
          {planets?.map((planet) => (
            <PlanetRowView
              events={eventHandlers}
              isLoading={isLoading}
              key={planet.id}
              planet={planet}
            />
          ))}
        </tbody>
      </Table>

      <Link to={"/planet/create"}>
        <button
          type="button"
          className="btn btn-primary"
          data-test={"btn-add-planet"}
        >
          {"Add a planet"}
        </button>
      </Link>
    </article>
  );
