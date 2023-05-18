/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNFT = /* GraphQL */ `
  subscription OnCreateNFT($filter: ModelSubscriptionNFTFilterInput) {
    onCreateNFT(filter: $filter) {
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
export const onUpdateNFT = /* GraphQL */ `
  subscription OnUpdateNFT($filter: ModelSubscriptionNFTFilterInput) {
    onUpdateNFT(filter: $filter) {
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
export const onDeleteNFT = /* GraphQL */ `
  subscription OnDeleteNFT($filter: ModelSubscriptionNFTFilterInput) {
    onDeleteNFT(filter: $filter) {
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
export const onCreateGaleria = /* GraphQL */ `
  subscription OnCreateGaleria($filter: ModelSubscriptionGaleriaFilterInput) {
    onCreateGaleria(filter: $filter) {
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
export const onUpdateGaleria = /* GraphQL */ `
  subscription OnUpdateGaleria($filter: ModelSubscriptionGaleriaFilterInput) {
    onUpdateGaleria(filter: $filter) {
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
export const onDeleteGaleria = /* GraphQL */ `
  subscription OnDeleteGaleria($filter: ModelSubscriptionGaleriaFilterInput) {
    onDeleteGaleria(filter: $filter) {
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
