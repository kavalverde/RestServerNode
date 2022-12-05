const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.usuariosPath = "/api/usuarios";

    //Middlewares
    this.middlewares();
    //Routes
    this.routes();
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
