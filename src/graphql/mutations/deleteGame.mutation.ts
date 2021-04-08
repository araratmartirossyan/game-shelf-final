import { gql } from "@urql/core";

export const deleteGame = gql(
  `mutation deleteGame($input: deleteGameInput) {
    deleteGame(input: $input) {
      game {
        title
        id
      }
    }
  }
`)