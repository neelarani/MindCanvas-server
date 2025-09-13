import express from "express";
import { globalErrorHandler, notFound } from "@/app/errors";
import { rootResponse } from "@/shared";
import router from "@/app/routes";

const app = express();

app.set("json spaces", 2);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.all("/", rootResponse);
app.use("/api/v1", router);

app.use(notFound);
app.use(globalErrorHandler);

export default app;
