import {SetFavoriteMutation, SetFavoriteMutationVariables} from '@/graphql/generated/types';
import SetFavorite from '@/graphql/mutations/activity/setFavorite';
import {useMutation} from '@apollo/client';
import {ActionIcon} from '@mantine/core';
import {IconStar} from '@tabler/icons-react';
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {useDebounced, useSnackbar} from '../hooks';

interface FavoriteButtonProps {
  isFavorite: boolean;
  id: string;
}

function FavoriteButton({isFavorite, id}: FavoriteButtonProps) {
  const snackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [setFavorite] = useMutation<SetFavoriteMutation, SetFavoriteMutationVariables>(SetFavorite);
  const [isFavoriteState, setIsFavorite] = useState(isFavorite);
  const debouncedFavorite = useDebounced(isFavoriteState, 300);

  const handleFavorite = useCallback(async () => {
    console.log(isFavorite);
    setIsFavorite(!isFavoriteState);
  }, [isFavoriteState]);

  useEffect(() => {
    try {
      setIsLoading(true);

      (async () =>
        await setFavorite({
          variables: {
            updateActivityInput: {id, isFavorite: debouncedFavorite},
          },
        }))();
    } catch (error) {
      snackbar.error('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [id, debouncedFavorite, setFavorite]);

  return (
    <ActionIcon onClick={() => handleFavorite()} disabled={isLoading}>
      <IconStar color="gold" fill={isFavorite ? 'gold' : 'none'} />
    </ActionIcon>
  );
}

export default FavoriteButton;
