require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("../config/express.config");

const cors = require("cors");
//const http = require("http");
//const server = http.createServer(app);

const companyRouter = require("./presentation-layer/routes/company.route");
const userRouter = require("./presentation-layer/routes/users.route");
const clientRouter = require("./presentation-layer/routes/client.route");
const jobsRouter = require("./presentation-layer/routes/jobs.route");
const categoryRouter = require("./presentation-layer/routes/category.route");
const serviceRouter = require("./presentation-layer/routes/service.route");
const visitRouter = require("./presentation-layer/routes/visit.route");
const authRouter = require("./presentation-layer/routes/auth.route");

//routeInit(app, express);
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    // "Access-Control-Allow-Origin",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// const db = require("./models");
// db.sequelize.sync(); 
//TODO

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}.`);
});

app.use("/api/companies", companyRouter);
app.use("/api/users", userRouter);
app.use("/api/clients", clientRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/api/visits", visitRouter);
app.use("/api/auth", authRouter);