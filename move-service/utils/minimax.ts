import { Chess } from "chess.js";
import {
  whiteBishopTable,
  whiteKingTable,
  whitePawnTable,
  whiteRookTable,
  blackBishopTable,
  blackKingTable,
  blackPawnTable,
  blackRookTable,
  knightTable,
  queenTable,
} from "./piece-square-tables";

function getBestBlackMove(
  game: Chess,
  depth: number
): { bestBlackMove: string; count: number } {
  let moves: string[] = game.moves();
  let bestMoveIndex: number = 0;
  let minScore: number = 99999;
  let numPositions = { count: 0 };
  for (let i = 0; i < moves.length; i++) {
    game.move(moves[i]);
    let score = minimax(depth, game, false, -999999, 999999, numPositions);
    if (score < minScore) {
      minScore = score;
      bestMoveIndex = i;
    }
    game.undo();
  }
  return { bestBlackMove: moves[bestMoveIndex], count: numPositions.count };
}

function minimax(
  depth: number,
  game: Chess,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  numPositions: { count: number }
): number {
  numPositions.count++;
  if (depth == 0 || game.moves().length == 0) {
    return evaluateBoardScore(game);
  }
  let moves = game.moves();
  if (isMaximizing) {
    let maxScore = -99999;
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      let score = minimax(depth - 1, game, false, alpha, beta, numPositions);
      maxScore = Math.max(score, maxScore);
      alpha = Math.max(alpha, score);
      game.undo();
      if (beta <= alpha) {
        break;
      }
    }
    return maxScore;
  } else {
    let minScore = 99999;
    for (let i = 0; i < moves.length; i++) {
      game.move(moves[i]);
      let score = minimax(depth - 1, game, false, alpha, beta, numPositions);
      minScore = Math.min(score, minScore);
      beta = Math.min(score, beta);
      game.undo();
      if (beta <= alpha) {
        break;
      }
    }
    return minScore;
  }
}

function evaluateBoardScore(game: Chess): number {
  const tableMap: { [index: string]: number[][] } = {
    wp: whitePawnTable,
    bp: blackPawnTable,
    wn: knightTable,
    bn: knightTable,
    wb: whiteBishopTable,
    bb: blackBishopTable,
    wr: whiteRookTable,
    br: blackRookTable,
    wq: queenTable,
    bq: queenTable,
    wk: whiteKingTable,
    bk: blackKingTable,
  };
  let pieceScores = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };
  let score = 0;
  let board = game.board();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] != null) {
        let key = game.board()[i][j]!.color + board[i][j]!.type;
        score += tableMap[key][i][j];
        if (board[i][j]!.color == "w") {
          score += pieceScores[board[i][j]!.type];
        } else {
          score -= pieceScores[board[i][j]!.type];
        }
      }
    }
  }
  return score;
}
export { getBestBlackMove };
