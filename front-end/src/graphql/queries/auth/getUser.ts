import gql from "graphql-tag";
import ActivityFragment from "../../fragments/activity";

const GetUser = gql`
  query GetUser {
    getMe {
      id
      firstName
      lastName
      email
      favoriteActivities {
        ...Activity
      }
    }
  }
  ${ActivityFragment}
`;

export default GetUser;
