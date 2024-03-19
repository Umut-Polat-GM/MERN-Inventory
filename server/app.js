require("dotenv").config();
require("express-async-errors");

//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

//Swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db/connect");

const mainRouter = require("./routes/routes");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/", (req, res) => {
    res.send("<h1>Store Inventory API</h1> <a href='/api-docs'>Documentation</a>");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1", mainRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
