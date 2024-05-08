import { gql, useLazyQuery } from "@apollo/client";
import { AirtimeFragment } from "./fragment";

const GET_AIRTIME = gql`
  query getAirtimeResponses {
    getAirtimeResponses {
      ...Airtimes
    }
  }
  ${AirtimeFragment}
`;

export const useAirtime = () => {
  const page = useLazyQuery(GET_AIRTIME, {
    fetchPolicy: "no-cache",
    // onError,
  });

  return {
    page: page[0],
  };
};
