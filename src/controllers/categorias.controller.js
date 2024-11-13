import categoria from "../models/Categoria.js";

export const getCategories = async (req, res) => {
  try {
    const result = await categoria.getAllCategories();
    res.status(200).send(result);
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};
