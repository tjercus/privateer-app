import React from "react";
import { Link } from "react-router-dom";
import { Alert, Table } from "@vismaux/react-nc4";
//
import { ID, SomeErrorType } from "../../domain/general";
import { hasValue } from "../../common/utils";
import { Planet } from "../../domain/types";
//
import { PlanetRowView } from "./PlanetRowView";

interface Props {
  error: SomeErrorType;
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
          <span className="vismaicon vismaicon-add-circle vismaicon-sm mr-8"></span>
          {"Add a planet"}
        </button>
      </Link>
    </article>
  );
