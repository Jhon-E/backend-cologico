import { pool } from "../db";

export const postImage = (req, res) => {
    console.log('Archivo recibido:', req.file);
    res.send('Archivo recibido correctamente.');
  }