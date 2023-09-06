const express = require("express");
const app = express();
const { PORT, DB_SYNC } = require("./config/serverConfig");
// const sequelize = require("sequelize");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = async () => {
  app.use("/api", apiRoutes);
  if (DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }

  app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`);
  });
};

setupAndStartServer();
