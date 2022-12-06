const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //connect to db
    this.connectDB();
    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
  }
  async connectDB() {
    await dbConnection();
  }
  //Middlewares
  middlewares() {
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port", this.port);
    });
  }
}
module.exports = Server;
