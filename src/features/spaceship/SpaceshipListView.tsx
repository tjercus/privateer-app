import React from "react";
import { Link } from "react-router-dom";
import { Alert, Table } from "@vismaux/react-nc4";
//
import { hasValue } from "../../common/utils";
import { ID, SomeErrorType } from "../../domain/general";
import { Spaceship } from "../../domain/types";
//
import { SpaceshipRowView } from "./SpaceshipRowView";
import {useTranslation} from "react-i18next";

interface Props {
  error: SomeErrorType;
  eventHandlers: {
    handleDeleteButtonClick: (spaceshipId: ID) => void;
  }; // TODO extract TYPE
  isLoading: boolean;
  spaceships?: Array<Spaceship>;
}

export const SpaceshipListView = ({
  error,
  eventHandlers,
  isLoading,
  spaceships,
}: Props) => {
  const { t } = useTranslation();
  return hasValue(error) ? (
    <Alert type="danger">
      {t("spaceship.list.error")}
    </Alert>
  ) : (
    <article>
      <h1>{t("spaceship.list.header")}</h1>
      <Table data-test={"table-list-spaceship"}>
        <thead>
        <tr>
          <th>{t("spaceship.list.table.header.name")}</th>
          <th>{t("spaceship.list.table.header.landedOn")}</th>
          <th>{t("spaceship.list.table.header.type")}</th>
          <th>{t("spaceship.list.table.header.armour")}</th>
          <th>{t("spaceship.list.table.header.weapons")}</th>
          <th>{t("spaceship.list.table.header.actions")}</th>
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
          {t("spaceship.list.button.add")}
        </button>
      </Link>
    </article>
  );
};
