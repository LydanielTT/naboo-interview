import React, { Fragment, useMemo } from "react";
import { Activity, GetFavoriteActivitiesQuery } from "../graphql/generated/types";
import FavoriteButton from "../components/FavoriteButton";

import { MantineReactTable, MRT_ColumnDef, useMantineReactTable } from "mantine-react-table";

const FavoriteActivitiesTable = ({
  favoriteActivities,
}: {
  favoriteActivities?: GetFavoriteActivitiesQuery["getMe"]["favoriteActivities"];
}) => {
  const favoriteActivitiesMemoized = useMemo(() => favoriteActivities || [], [favoriteActivities]);
  const columns = useMemo<any>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "city",
        header: "Ville",
      },
      {
        accessorKey: "price",
        header: "Prix",
      },
      {
        accessorKey: "isFavorite",
        header: "Favoris",
        Cell: ({ cell }: any) => {
          return <FavoriteButton id={cell.row.original.id} />;
        },
      },
    ],
    [],
  );
  const table = useMantineReactTable({
    columns,
    data: favoriteActivitiesMemoized, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true,
    enableGlobalFilter: false, //turn off a feature
  });
  return (
    <Fragment>
      <MantineReactTable table={table} />
    </Fragment>
  );
};

export default FavoriteActivitiesTable;
