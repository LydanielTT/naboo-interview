import gql from 'graphql-tag';

const SetFavorite = gql`
  mutation SetFavorite($updateActivityInput: UpdateActivityInput!) {
    setFavorite(updateActivityInput: $updateActivityInput) {
      id
      isFavorite
    }
  }
`;

export default SetFavorite;
