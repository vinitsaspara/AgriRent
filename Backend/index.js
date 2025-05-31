import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser";
import equipmentRoute from "./routes/equipmentRoute.js"
import assignmentRoute from "./routes/assignmentHistoryRoute.js"

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use("/api/v1/user", userRoute);
app.use("/api/v1/equipment", equipmentRoute);
app.use("/api/v1/assignment", assignmentRoute);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port : ${PORT}`)
});
