import { useMutation } from "@apollo/client";
import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  AddFavoriteActivityMutation,
  AddFavoriteActivityMutationVariables,
  RemoveFavoriteActivityMutation,
  RemoveFavoriteActivityMutationVariables,
} from "../graphql/generated/types";
import AddFavoriteActivity from "../graphql/mutations/auth/addFavoriteActivity";
import RemoveFavoriteActivity from "../graphql/mutations/auth/removeFavoriteActivity";
import GetUser from "../graphql/queries/auth/getUser";
import { useAuth } from "../hooks";

interface FavoriteButtonProps {
  id: string;
}

function FavoriteButton({ id }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user, setFavoriteActivities } = useAuth();

  useEffect(() => {
    const nextVal = !!user?.favoriteActivities?.find((a) => a.id === id);
    setIsFavorite(nextVal);
  }, [user]);

  const [addFavoriteActivity] = useMutation<AddFavoriteActivityMutation, AddFavoriteActivityMutationVariables>(
    AddFavoriteActivity,
    {
      refetchQueries: [GetUser],
      onCompleted: (data) => {
        setFavoriteActivities(data.addFavoriteActivity.favoriteActivities);
      },
    },
  );

  const [removeFavoriteActivities] = useMutation<
    RemoveFavoriteActivityMutation,
    RemoveFavoriteActivityMutationVariables
  >(RemoveFavoriteActivity, {
    refetchQueries: [GetUser],

    onCompleted: (data) => {
      setFavoriteActivities(data.removeFavoriteActivity.favoriteActivities);
    },
  });
  const handleFavorite = async (stateFavorite: boolean) => {
    if (stateFavorite) {
      addFavoriteActivity({
        variables: {
          addFavoriteActivityInput: {
            activityId: id,
          },
        },
      });
    } else {
      removeFavoriteActivities({
        variables: {
          removeFavoriteActivityInput: {
            activityId: id,
          },
        },
      });
    }
  };

  return (
    <ActionIcon onClick={() => handleFavorite(!isFavorite)}>
      <IconStar color="gold" fill={isFavorite ? "gold" : "none"} />
    </ActionIcon>
  );
}

export default FavoriteButton;
