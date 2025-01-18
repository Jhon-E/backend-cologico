import pool from "../db.js";

class Order {
  id_user;
  estado;
  metodo_pago;
  total;
  constructor() {}

  async saveOrder(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      await request.execute("sp_insertarPedido");
    } catch (e) {
      console.error("Error guardando el pedido: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }

  async getOrderID() {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      const result = await request.execute("sp_obtenerIdUltimoPedido");

      return result.recordset[0].ID_pedido;
    } catch (e) {
      console.error("Error al obtener el id del pedido: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }

  async getOrder(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();


      for(const key in parameters){
        request.input(key, parameters[key])
      }

      const result = await request.execute("sp_obtenerPedidoRecientePorUsuario");

      return result.recordset[0];
    } catch (e) {
      console.error("Error al obtener el pedido: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }

  async getProductsByOrder(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      for(const key in parameters){
        request.input(key, parameters[key])
      }
      const result = await request.execute("sp_obtenerProductosPedido");
      return result.recordset;
    } catch (e) {
      console.error("Error al obtener el id del pedido: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }

  async saveItem(parameters = {}) {
    try {
      //const pool = await db.getConection();
      const request = pool.request();

      for (const key in parameters) {
        request.input(key, parameters[key]);
      }

      await request.execute("sp_insertarPedidoItem");
    } catch (e) {
      console.error("Error guardando el item: ", e);
    } /* finally {
      await db.closeConection();
    } */
  }
}

export default Order;
