import express from "express";
import cors from "cors";
import { Chess } from "chess.js";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import { getBestBlackMove } from "./utils/minimax";

dotenv.config();

const app: express.Application = express();

const port: number = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "TypeScript With Express" });
});

app.post("/best_black_move", (req, res) => {
  let fen: string = req.body["fen"];
  console.log(`Recieved request:${fen}`);
  let game: Chess = new Chess(fen);
  const move = getBestBlackMove(game, 3);
  console.log(move);
  res.json(move);
});

if (process.env.NODE_ENV == "PROD") {
  let key = fs.readFileSync(process.env.KEY_PATH);
  let cert = fs.readFileSync(process.env.CERT_PATH);
  let options = {
    key: key,
    cert: cert,
  };
  let httpsServer = https.createServer(options, app);
  console.log("Listening on port 8000");
  httpsServer.listen(8000);
} else {
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  });
}
