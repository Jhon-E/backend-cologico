import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

class Conection {
  
  sqlConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.URL_HOST || "localhost",
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  pool = new sql.ConnectionPool(this.sqlConfig);

  constructor() {}

  async getConection() {
    if (!this.pool.connected) {
      try {
        await this.pool.connect();
      } catch (e) {
        console.error("Error al conectar a la base de datos: ", e);
      }
    }

    return this.pool;
  }

  async closeConection() {
    if (this.pool.connected) {
      try {
        await this.pool.close();
      } catch (e) {
        console.error("Error al desconectar a la base de datos: ", e);
      }
    }

    return this.pool;
  }
}
const db = new Conection();
const pool = await db.getConection()
export default pool