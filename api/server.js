const express = require("express");
const usersRouter = require("./users/users-router");
const server = express();
const { logger } = require("./middleware/middleware");

// ekspres'in varsayılan olarak istek gövdelerinde JSON'u ayrıştıramayacağını unutmayın

// global ara yazılımlar ve kullanıcı routelarının buraya bağlanması gerekir

server.use(express.json());

server.use("/api/users", logger, usersRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Biraz ara yazılım yazalım!</h2>`);
});

module.exports = server;
