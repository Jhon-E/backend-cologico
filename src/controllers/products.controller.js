import producto from "../models/Producto.js";
import Usuario from "../models/Usuario.js";
import categoriaModel from "../models/Categoria.js";
//LA CATEGORIA DEBERIA VENIR COMO EL ID DE ESTA

export const createProduct = async (req, res) => {
  const {
    nombre,
    precio,
    stock,
    categoria,
    descripcion,
    imagen,
    nombreUser,
    emailUser,
  } = req.body;
  

  try {
    const id_user = await new Usuario().findUser(
      "SELECT ID_usuarioVendedor FROM usuario_vendedor as v INNER JOIN usuario as u ON u.ID_usuario = v.ID_usuario WHERE u.nombre LIKE @n AND u.email LIKE @e",
      { n: nombreUser, e: emailUser }
    );

    console.log(id_user);
    

    const id_cat = await categoriaModel.getcategorieIdByName({ n: categoria });
    

    const result = await producto.createProduct({
      a: nombre,
      b: parseFloat(precio),
      c: parseInt(stock, 10),
      d: descripcion,
      e: id_cat,
      f: imagen,
      g: id_user.ID_usuarioVendedor,
    });

    res.send(result);
  } catch (err) {
    console.error("Error al insertar producto en la database", err);
    res.status(500).send("Error interno del server");
  }
};

export const getProducts = async (req, res) => {
  try {
    const result = await producto.getProducts();
    res.status(200).send(result);
  } catch (err) {
    console.error("Error al consultar los productos", err);
    res.status(500).send("Error interno del server");
  }
};

export const getProduct = async (req, res) => {
  const productID = req.params.id;
  try {
    const product = await producto.getProduct({ id: productID });

    const infoSeller = await producto.getInfoSeller({ id: productID });

    if (product.length > 0 && infoSeller.length > 0) {
      const response = { product, seller: infoSeller };
      res.send(response);
    } else {
      res.status(404).send("producto no encontrado");
    }
  } catch (err) {
    console.error("Error al consultar el producto: ", err);
    res.status(500).send("Error interno del server");
  }
};

export const getProductBySeller = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    //TENGO QUE OBTENER EL ID PERO DE VENDEDOR

    const user_seller = await new Usuario().findUser(
      "SELECT ID_usuarioVendedor FROM usuario INNER JOIN usuario_vendedor ON usuario.ID_usuario = usuario_vendedor.ID_usuario WHERE nombre LIKE @a AND email LIKE @c;",
      { a: nombre, c: email }
    );

    const products_by_seller = await producto.getProductBySeller({
      i: user_seller.ID_usuarioVendedor,
    });

    res.send(products_by_seller);
  } catch (err) {
    console.error("Error al consultar los productos de vendedor", err);
    res.status(500).send("Error interno del server");
  }
};
