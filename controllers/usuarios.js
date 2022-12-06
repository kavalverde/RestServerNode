const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  //const { q, nombre = "no name", apikey } = req.query;
  const query = { estado: true };
  const { limit = 5, init = 0 } = req.query;
  /* const usuarios = await Usuario.find(query)
    .skip(Number(init))
    .limit(Number(limit));

    const total = await ;*/
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(init)).limit(Number(limit)),
  ]);
  res.json({
    ok: true,
    msj: "Server running get - controler",
    total,
    usuarios,
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...resto } = req.body;

  //Validad BD
  if (password) {
    //Encryptar contraseña
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json({
    ok: true,
    msj: "Server running get",
    usuario,
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  //Encryptar contraseña
  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);
  //Guardar usuario
  await usuario.save();
  res.status(201).json({
    ok: true,
    msj: "Server running post",
    usuario,
  });
};
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  //const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
  res.json({
    ok: true,
    msj: "Server running delete",
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
