import gql from "graphql-tag";

export const AirtimeFragment = gql`
  fragment Airtimes on Airtime {
    code
    response_description
    requestId
    transactionId
    amount
    purchased_code
  }
`;
