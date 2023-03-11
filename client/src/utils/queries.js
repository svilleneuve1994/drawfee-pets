import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      activePet {
        _id
        petName
        petSpecies
        petColour
        createdAt
        petOwner
      }
      pets {
        _id
        petName
        petSpecies
        petColour
        createdAt
        petOwner
      }
      inbox {
        _id
        messageRecipient
        messageTitle
        messageText
        messageAuthor
        createdAt
      }
      posts {
        _id
        postTitle
        postText
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      activePet {
        _id
        petName
        petSpecies
        petColour
        createdAt
        petOwner
      }
      pets {
        _id
        petName
        petSpecies
        petColour
        createdAt
        petOwner
      }
      posts {
        _id
        postTitle
        postText
        createdAt
      }
    }
  }
`;

export const QUERY_ALLPETS = gql`
  query getAllPets {
    allpets {
      petSpecies
    }
  }
`;

export const QUERY_PETS = gql`
  query getPets {
    pets {
      _id
      petSpecies
      petName
      petColour
      createdAt
      petOwner
    }
  }
`;

export const QUERY_SINGLE_PET = gql`
  query getSinglePet($petId: ID!) {
    pet(petId: $petId) {
      _id
      petSpecies
      petName
      petColour
      createdAt
      petOwner
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_INBOX = gql`
  query getInbox {
    inbox {
      _id
      messageRecipient
      messageTitle
      messageText
      messageAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_MESSAGE = gql`
  query getSingleMessage($messageId: ID!) {
    message(messageId: $messageId) {
      _id
      messageRecipient
      messageTitle
      messageText
      messageAuthor
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      activePet {
        _id
        petName
        petSpecies
        petColour
        createdAt
        petOwner
      }
      pets {
        _id
        petName
        petSpecies
        petColour
        createdAt
        petOwner
      }
      inbox {
        _id
        messageRecipient
        messageTitle
        messageText
        messageAuthor
        createdAt
      }
      posts {
        _id
        postTitle
        postText
        createdAt
      }
    }
  }
`;
