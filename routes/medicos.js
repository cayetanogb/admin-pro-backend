/**
 * Ruta: /api/medicos
 */
const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getMedicos,
  getMedicoById,
  postMedico,
  putMedico,
  deleteMedico,
} = require("../controllers/medicos");

const router = Router();

router.get("/", validarJWT, getMedicos);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe de ser valido").isMongoId(),
    validarCampos,
  ],
  postMedico
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del medico es obligatorio").not().isEmpty(),
    check("hospital", "El hospital id debe de ser valido").isMongoId(),
    validarCampos,
  ],
  putMedico
);

router.delete("/:id", validarJWT, deleteMedico);

router.get("/:id", validarJWT, getMedicoById);

module.exports = router;
