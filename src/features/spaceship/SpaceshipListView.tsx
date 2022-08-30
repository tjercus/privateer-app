import { Spaceship } from "../../domain/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface Props {
  spaceships?: Array<Spaceship>;
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}

export const SpaceshipListView = ({ spaceships, error, isLoading }: Props) => (
  <section>
    <h1>{"Spaceships"}</h1>
    <ol>
      {spaceships?.map((spaceship) => (
        <li>{spaceship.name}</li>
      ))}
    </ol>
  </section>
);
