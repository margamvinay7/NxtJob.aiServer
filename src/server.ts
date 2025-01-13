import express from "express";
import jobRoutes from "./routes/job.routes";
import errorMiddleware from "./middlewares/error.middleware";
import rateLimiter from "./middlewares/rateLimiter.middleware";
import dotenv from "dotenv";
import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load(path.resolve(__dirname, "../swagger.yml"));

app.use(
  "/swagger-static",
  express.static(path.resolve(__dirname, "../node_modules/swagger-ui-dist"))
);
// using '/' route for swagger ui testing for easy purpose
app.use(
  "/",
  swaggerUi.serveFiles(swaggerDocument, {
    swaggerOptions: { url: "/swagger-static/swagger.yml" },
  }),
  swaggerUi.setup(swaggerDocument)
);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(rateLimiter);
app.use("/api/jobs", jobRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
