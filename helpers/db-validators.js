const Role = require("../models/role");
const Usuario = require("../models/usuario");
const isValidRole = async (rol = "") => {
  const existsRole = await Role.findOne({ rol });
  if (!existsRole) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};
const emailExists = async (correo = "") => {
  const isEmailAvailable = await Usuario.findOne({ correo });
  if (isEmailAvailable) {
    throw new Error(`El correo ${correo} ya está en uso`);
  }
};
const userExistsByID = async (id) => {
  const userExists = await Usuario.findById(id);
  if (!userExists) {
    throw new Error(`El usuario no existe`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userExistsByID,
};
