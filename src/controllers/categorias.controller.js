import { pool } from "../db.js";

export const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    await pool.query('INSERT INTO categorias (nombre,descripcion) VALUES (?,?)',[nombre,descripcion])
    res.status(200).send({message: 'categoria creada'})
  } catch (err) {
    console.error("Error al insertar en la database", err);
    res.status(500).send("Error interno del server hptaa");
  }
};

export const getCategories = async (req, res) => {
   try{
    const categorias = await pool.query('SELECT * FROM categorias;')
    res.send(categorias[0])
   }catch(err){
    console.error('Error al consultar los productos', err);
    res.status(500).send('Error interno del server')
   }
}