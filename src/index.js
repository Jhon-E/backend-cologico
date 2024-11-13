import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js";
import categoriesRoutes from "./routes/categorias.routes.js";
import userRouter from "./routes/user.routes.js";
import commentsRouter from "./routes/coments.routes.js";
import orderRouter from "./routes/order.routes.js"
import cors from "cors";
import morgan from 'morgan'

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

const app = express();

//ESTA LINEA VUELVE LAS RESPUESTAS A FORMATO JSON
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(authRoutes);
app.use(productsRoutes);
app.use(categoriesRoutes);
app.use(userRouter);
app.use(commentsRouter);
app.use(orderRouter);

app.listen(8000, () => {
  console.log("Aplicación escuchando el puerto http://localhost:8000");
});
