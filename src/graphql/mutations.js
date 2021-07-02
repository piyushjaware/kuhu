/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTag = /* GraphQL */ `
  mutation CreateTag(
    $input: CreateTagInput!
    $condition: ModelTagConditionInput
  ) {
    createTag(input: $input, condition: $condition) {
      user
      tagName
      color
      moreData
      createdAt
      updatedAt
    }
  }
`;
export const updateTag = /* GraphQL */ `
  mutation UpdateTag(
    $input: UpdateTagInput!
    $condition: ModelTagConditionInput
  ) {
    updateTag(input: $input, condition: $condition) {
      user
      tagName
      color
      moreData
      createdAt
      updatedAt
    }
  }
`;
export const deleteTag = /* GraphQL */ `
  mutation DeleteTag(
    $input: DeleteTagInput!
    $condition: ModelTagConditionInput
  ) {
    deleteTag(input: $input, condition: $condition) {
      user
      tagName
      color
      moreData
      createdAt
      updatedAt
    }
  }
`;
export const createLink = /* GraphQL */ `
  mutation CreateLink(
    $input: CreateLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    createLink(input: $input, condition: $condition) {
      user
      linkName
      tagName
      url
      weight
      moreData
      createdAt
      updatedAt
    }
  }
`;
export const updateLink = /* GraphQL */ `
  mutation UpdateLink(
    $input: UpdateLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    updateLink(input: $input, condition: $condition) {
      user
      linkName
      tagName
      url
      weight
      moreData
      createdAt
      updatedAt
    }
  }
`;
export const deleteLink = /* GraphQL */ `
  mutation DeleteLink(
    $input: DeleteLinkInput!
    $condition: ModelLinkConditionInput
  ) {
    deleteLink(input: $input, condition: $condition) {
      user
      linkName
      tagName
      url
      weight
      moreData
      createdAt
      updatedAt
    }
  }
`;
