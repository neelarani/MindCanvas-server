import NeelaBlogApp from "@/_server";
import { connectDB } from "./config";

const server = new NeelaBlogApp();

(async () => {
  try {
    await connectDB();
    await server.init();
  } catch (error) {
    console.error("Failed to start server:", error);
    await server.shutdown();
  }
})();

const gracefulShutdown = async (reason: string) => {
  console.log(`${reason} received, shutting down...`);
  await server.shutdown();
};

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  gracefulShutdown("unhandledRejection");
});

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
