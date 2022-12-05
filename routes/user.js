const { Router } = require("express");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPathch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.patch("/", usuariosPathch);

module.exports = router;
