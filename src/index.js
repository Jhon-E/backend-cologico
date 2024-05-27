import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js"
import categoriesRoutes from "./routes/categorias.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"

const app = express();

//ESTA LINEA VUELVE LAS RESPUESTAS A FORMATO JSON
app.use(cors())
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json())

app.use(authRoutes);
app.use(productsRoutes);
app.use(categoriesRoutes)
app.use(userRouter)


app.listen(8000, () => {
  console.log("epa estoy escuchando en el 8000 rey.");
});
