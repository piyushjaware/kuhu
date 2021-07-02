/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTag = /* GraphQL */ `
  query GetTag($user: AWSEmail!, $tagName: String!) {
    getTag(user: $user, tagName: $tagName) {
      user
      tagName
      color
      moreData
      createdAt
      updatedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $user: AWSEmail
    $tagName: ModelStringKeyConditionInput
    $filter: ModelTagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTags(
      user: $user
      tagName: $tagName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user
        tagName
        color
        moreData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLink = /* GraphQL */ `
  query GetLink($user: AWSEmail!, $linkName: String!) {
    getLink(user: $user, linkName: $linkName) {
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
export const listLinks = /* GraphQL */ `
  query ListLinks(
    $user: AWSEmail
    $linkName: ModelStringKeyConditionInput
    $filter: ModelLinkFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listLinks(
      user: $user
      linkName: $linkName
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user
        linkName
        tagName
        url
        weight
        moreData
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
