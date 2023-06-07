import { Chess } from "chess.js";

import {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
} from "aws-lambda";
import { getBestBlackMove } from "./utils/minimax";

interface Input {
  fen: string;
}
interface Output {
  bestBlackMove: string;
  count: number;
  score: number;
}

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  let responseBody: Output = {
    bestBlackMove: "no move available",
    count: 0,
    score: 0,
  };

  try {
    const requestBody = JSON.parse(event["body"]!);
    let game: Chess = new Chess(requestBody.fen);
    let bestBlackMove = getBestBlackMove(game, 3);
    responseBody = bestBlackMove;
  } catch (err) {
    console.log("Please use a valid fen string");
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
};
