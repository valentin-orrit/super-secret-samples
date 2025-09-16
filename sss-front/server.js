import { createRequestHandler } from "@react-router/express";
import express from "express";

const BUILD_PATH = "./build/server/index.js";
const PORT = 5174;

const app = express();

app.use(
    "/assets",
    express.static("build/client/assets", {
        immutable: true,
        maxAge: "1y",
    })
);

app.use(express.static("build/client", {maxAge: "1h"}));

app.all(
    /.*/,
    createRequestHandler({
        build: () => import(BUILD_PATH),
        mode: "production",
    })
);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});
