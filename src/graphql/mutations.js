/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNFT = /* GraphQL */ `
  mutation CreateNFT(
    $input: CreateNFTInput!
    $condition: ModelNFTConditionInput
  ) {
    createNFT(input: $input, condition: $condition) {
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
export const updateNFT = /* GraphQL */ `
  mutation UpdateNFT(
    $input: UpdateNFTInput!
    $condition: ModelNFTConditionInput
  ) {
    updateNFT(input: $input, condition: $condition) {
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
export const deleteNFT = /* GraphQL */ `
  mutation DeleteNFT(
    $input: DeleteNFTInput!
    $condition: ModelNFTConditionInput
  ) {
    deleteNFT(input: $input, condition: $condition) {
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
export const createGaleria = /* GraphQL */ `
  mutation CreateGaleria(
    $input: CreateGaleriaInput!
    $condition: ModelGaleriaConditionInput
  ) {
    createGaleria(input: $input, condition: $condition) {
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
export const updateGaleria = /* GraphQL */ `
  mutation UpdateGaleria(
    $input: UpdateGaleriaInput!
    $condition: ModelGaleriaConditionInput
  ) {
    updateGaleria(input: $input, condition: $condition) {
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
export const deleteGaleria = /* GraphQL */ `
  mutation DeleteGaleria(
    $input: DeleteGaleriaInput!
    $condition: ModelGaleriaConditionInput
  ) {
    deleteGaleria(input: $input, condition: $condition) {
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
