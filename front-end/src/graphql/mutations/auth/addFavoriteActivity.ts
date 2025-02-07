import gql from "graphql-tag";
import ActivityFragment from "../../fragments/activity";

const AddFavoriteActivity = gql`
  mutation AddFavoriteActivity($addFavoriteActivityInput: AddFavoriteActivityInput!) {
    addFavoriteActivity(addFavoriteActivityInput: $addFavoriteActivityInput) {
      id
      favoriteActivities {
        ...Activity
      }
    }
  }
  ${ActivityFragment}
`;

export default AddFavoriteActivity;
