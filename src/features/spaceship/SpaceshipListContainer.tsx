import * as React from "react";
import { SpaceshipListView } from "./SpaceshipListView";
import { useGetSpaceshipsQuery } from "./spaceshipApi";

export const SpaceshipListContainer = () => {
  const { data, error, isLoading } = useGetSpaceshipsQuery();

  return (
    <SpaceshipListView spaceships={data} error={error} isLoading={isLoading} />
  );
};
