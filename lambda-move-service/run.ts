import { handler } from ".";
import { APIGatewayProxyEvent } from "aws-lambda";

const main = async () => {
  console.log(
    await handler({
      body: JSON.stringify({
        fen: "rnb1kbnr/p4ppp/2p1p3/qB1p4/1P1P1B2/3QP3/P1P2PPP/RN2K1NR b KQkq - 0 6",
      }),
    } as any)
  );
  console.log(
    await handler({
      body: JSON.stringify({
        fen: "rnbqkbnr/p3pppp/2p5/1B1p4/3P1B2/4P3/PPP2PPP/RN1QK1NR b KQkq - 0 4",
      }),
    } as any)
  );
  console.log(
    await handler({
      body: JSON.stringify({
        fen: "rnbqkbnr/pp2pppp/2p5/3p4/3P1B2/4P3/PPP2PPP/RN1QKBNR b KQkq - 0 3",
      }),
    } as any)
  );
  console.log(
    await handler({
      body: JSON.stringify({
        fen: "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2",
      }),
    } as any)
  );
  console.log(
    await handler({
      body: JSON.stringify({
        fen: "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2",
      }),
    } as any)
  );
};

main();
