"use client";

import { useEffect, useRef, useState } from "react";
import { Chess, Move, Square } from "chess.js";
import { Chessboard } from "react-chessboard";

interface BoardMove {
    from: string;
    to: string;
    promotion: string;
}

export default function Board() {
    const [game, setGame] = useState(new Chess());
    const [draggable, setDraggable] = useState(true);
    const [totalPositions, setTotalPositions] = useState(0);
    useEffect(() => {
        if (game.isGameOver()) {
            alert("game has ended");
            return;
        }
        if (game.turn() == "b") {
            setDraggable(false);

            // setTimeout(() => {
            //     let { bestBlackMove, count } = getBestBlackMove(game);
            //     setTotalPositions(totalPositions + count);
            //     makeAMove(bestBlackMove);
            // }, 300);
            console.log({ fen: game.fen() });
            fetch(
                "https://9y57ac2n3c.execute-api.us-east-2.amazonaws.com/best_black_move",
                {
                    method: "POST",
                    body: JSON.stringify({
                        fen: game.fen(),
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: "no-store",
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setTotalPositions(totalPositions + data.count);
                    makeAMove(data.bestBlackMove);

                    setDraggable(true);
                });
        } else {
        }
    }, [game]);

    function makeAMove(move: BoardMove | string) {
        const gameCopy = new Chess(game.fen());
        let result: Move | null = null;
        try {
            result = gameCopy.move(move);
        } catch (error) {}
        setGame(gameCopy);
        return result; // null if the move was illegal, the move object if the move was legal
    }

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q", // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return false;
        return true;
    }
    return (
        <>
            <div className="my-3 w-fit h-fit p-2 bg-gray-100 rounded text-black">
                Total Positions Computed: {totalPositions}
            </div>
            <div>
                <Chessboard
                    arePiecesDraggable={draggable}
                    position={game.fen()}
                    onPieceDrop={onDrop}
                />
            </div>
        </>
    );
}
