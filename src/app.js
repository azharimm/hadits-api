const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();
require("./db/connection");

const middlewares = require("./middlewares");
const haditsRouter = require("./routes/hadits");
const indexRouter = require("./routes/index");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", indexRouter);
app.use("/books", haditsRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
