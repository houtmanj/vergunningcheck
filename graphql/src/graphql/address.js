const debug = require("debug")("graphql:address");
const { gql } = require("../util");
var { GraphQLError } = require("graphql");

const typeDefs = gql`
  type Address implements Node {
    id: ID!
    streetName: String!
    houseNumber: Int!
    houseNumberSuffix: String
    houseNumberFull: String!
    postalCode: String!
    residence: String!
    type: AddressType!
  }
  enum AddressType {
    BERTH
    BUILDING
  }
  type AddressSearch {
    matches: [Address]!
    exactMatch: Address
  }
  type Query {
    address(id: ID!): Address
    findAddress(
      streetName: String
      postalCode: String
      houseNumberFull: String!
    ): AddressSearch!
  }
`;

/**
 * XXX refactor. Not exactly clear what business requirements are
 * and if this is the best way to implement it.
 */
function getExactMatch(queryHouseNumberFull, list) {
  // if no letter or suffix is found, we need an exact match
  if (list.length > 1) {
    const first = list[0];
    if (
      first.houseNumber &&
      !first.houseNumberLetter &&
      !first.houseNumberSuffix
    ) {
      return list.filter(
        address => address.houseNumber === Number(queryHouseNumberFull)
      );
    }
  }

  return list.filter(
    address =>
      address.houseNumber === Number(queryHouseNumberFull) ||
      address.houseNumberFull === queryHouseNumberFull
  );
}

const resolve = (args, bagSearch, one) => {
  debug(`find ${one ? "one" : "any"} address`, args);
  const { streetName, postalCode } = args;
  const houseNumberFull = args.houseNumberFull.trim().replace("-", " ");

  if (!streetName && !postalCode) {
    return new GraphQLError("Please provide 'streetName' or 'postalCode'.");
  } else if (streetName && postalCode) {
    return new GraphQLError(
      "Please provide either 'streetName' òr 'postalCode'."
    );
  }
  const key = (postalCode || "") + (streetName || "") + " " + houseNumberFull;

  return bagSearch.load(key).then(result => {
    if (one) {
      const res = getExactMatch(houseNumberFull, result);
      return res.length === 1 ? res[0] : result.length === 1 ? result[0] : null;
    }
    return result;
  });
};

const resolvers = {
  AddressSearch: {
    matches: (args, _, { loaders }) => resolve(args, loaders.bagSearch),
    exactMatch: (args, _, { loaders }) => resolve(args, loaders.bagSearch, true)
  },
  Address: {
    id: ({ _adressableObjectId }) =>
      Buffer.from(_adressableObjectId).toString("base64")
  },
  Query: {
    findAddress: (_, args) => args,
    address: async (_, { id }, { loaders }) => {
      const x = Buffer.from(id, "base64").toString("ascii");
      const res = await loaders.bagSearch.load(x);
      return res[0];
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
