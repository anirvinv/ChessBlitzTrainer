import express from "express";
import cors from "cors";
import { Chess } from "chess.js";
import { getBestBlackMove } from "./utils/minimax";

const app: express.Application = express();

const port: number = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "TypeScript With Express" });
});

app.post("/best_black_move", (req, res) => {
  let fen: string = req.body["fen"];
  let game: Chess = new Chess(fen);
  const move = getBestBlackMove(game, 2);
  res.json(move);
});

app.listen(port, () => {
  console.log(`Express
         http://localhost:${port}/`);
});
