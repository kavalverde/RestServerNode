const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "no name", apikey } = req.query;
  res.json({
    ok: true,
    msj: "Server running get - controler",
    q,
    nombre,
    apikey,
  });
};
const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    ok: true,
    msj: "Server running get",
    id,
  });
};
const usuariosPost = (req, res = response) => {
  const body = req.body;
  res.status(201).json({
    ok: true,
    msj: "Server running post",
    ...body,
  });
};
const usuariosPathch = (req, res = response) => {
  res.json({
    ok: true,
    msj: "Server running patch",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPathch,
};
