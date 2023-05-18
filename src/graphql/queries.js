/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNFT = /* GraphQL */ `
  query GetNFT($id: ID!) {
    getNFT(id: $id) {
      id
      contractadress
      tokenID
      usuario
      prioridad
      createdAt
      updatedAt
    }
  }
`;
export const listNFTS = /* GraphQL */ `
  query ListNFTS(
    $filter: ModelNFTFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNFTS(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        contractadress
        tokenID
        usuario
        prioridad
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGaleria = /* GraphQL */ `
  query GetGaleria($id: ID!) {
    getGaleria(id: $id) {
      id
      usuario
      tipo
      visitas
      precio
      createdAt
      updatedAt
    }
  }
`;
export const listGalerias = /* GraphQL */ `
  query ListGalerias(
    $filter: ModelGaleriaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGalerias(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        usuario
        tipo
        visitas
        precio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
