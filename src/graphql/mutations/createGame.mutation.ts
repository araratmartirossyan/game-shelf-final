import { gql } from "@urql/core";

export const createGameMutation = gql(`
  mutation createGame($input: createGameInput!) {
    createGame(input: $input) {
      game {
        title
        id
        description
      }
    }
  }
`)