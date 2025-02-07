import gql from "graphql-tag";
import ActivityFragment from "../../fragments/activity";

const RemoveFavoriteActivity = gql`
  mutation RemoveFavoriteActivity($removeFavoriteActivityInput: RemoveFavoriteActivityInput!) {
    removeFavoriteActivity(removeFavoriteActivityInput: $removeFavoriteActivityInput) {
      id
      favoriteActivities {
        ...Activity
      }
    }
  }
  ${ActivityFragment}
`;

export default RemoveFavoriteActivity;
