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
    depth = 2
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
            let score = minimax(
                depth - 1,
                game,
                false,
                alpha,
                beta,
                numPositions
            );
            if (score > maxScore) {
                maxScore = score;
            }
            if (maxScore > alpha) {
                alpha = maxScore;
            }
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
            let score = minimax(
                depth - 1,
                game,
                false,
                alpha,
                beta,
                numPositions
            );
            if (score < minScore) {
                minScore = score;
            }
            if (minScore < beta) {
                beta = minScore;
            }
            game.undo();
            if (beta <= alpha) {
                break;
            }
        }
        return minScore;
    }
}

function evaluateBoardScore(game: Chess): number {
    function getTableScore(
        table: number[][],
        type: string,
        color: string
    ): number {
        let score = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (
                    game.board() != null &&
                    type === game.board()[i][j]?.type &&
                    game.board()[i][j]?.color === color
                ) {
                    score += table[i][j];
                }
            }
        }
        return score;
    }
    let score = 0;
    score += getTableScore(whitePawnTable, "p", "w");
    score += getTableScore(blackPawnTable, "p", "b");

    score += getTableScore(knightTable, "n", "w");
    score += getTableScore(knightTable, "n", "b");

    score += getTableScore(whiteBishopTable, "b", "w");
    score += getTableScore(blackBishopTable, "b", "b");

    score += getTableScore(whiteRookTable, "r", "w");
    score += getTableScore(blackRookTable, "r", "b");

    score += getTableScore(queenTable, "q", "w");
    score += getTableScore(queenTable, "q", "b");

    score += getTableScore(whiteKingTable, "k", "w");
    score += getTableScore(blackKingTable, "k", "b");

    let pieceScores = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };

    const board = game.board();
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] != null) {
                score +=
                    board[i][j]!.color == "w"
                        ? pieceScores[board[i][j]!.type]
                        : -1 * pieceScores[board[i][j]!.type];
            }
        }
    }

    return score;
}
export { getBestBlackMove };
