import React from "react";
import { Icon, Table, TableRow } from "@vismaux/react-nc4";
import { Link } from "react-router-dom";
//
import { ID } from "../../domain/types";
//
import { Hardware } from "./hardwareTypes";

interface Props {
  eventHandlers: { handleDeleteButtonClick: (hardwareId: ID) => void };
  hardwares: Array<Hardware>;
}

export const HardwareListView = ({ eventHandlers, hardwares }: Props) => (
  <article>
    <h1>{"Hardwares"}</h1>
    <Table data-test={"table-list-hardware"}>
      <thead>
        <tr>
          <th>{"Name"}</th>
          <th>{"Type"}</th>
          <th>{"Cost"}</th>
          <th>{"Actions"}</th>
        </tr>
      </thead>
      <tbody>
        {hardwares.map((hardware) => (
          <TableRow key={hardware.name}>
            <td>
              <Link
                data-test={"link-hardware"}
                to={`/hardware/edit/${hardware.id}`}
              >
                {hardware.name}
              </Link>
            </td>
            <td>{hardware.type}</td>
            <td>{hardware.cost}</td>
            <td>
              <button
                data-test={"btn-delete-hardware"}
                onClick={() =>
                  eventHandlers.handleDeleteButtonClick(hardware.id)
                }
              >
                <Icon name="trash" size="lg" /> {"Delete"}
              </button>
            </td>
          </TableRow>
        ))}
      </tbody>
    </Table>

    <Link to={"/hardware/create"}>
      <button
        type="button"
        className="btn btn-primary"
        data-test={"btn-add-hardware"}
      >
        {"Add a hardware"}
      </button>
    </Link>
  </article>
);
