import cors from "cors";
import express from "express";
import helmet from "helmet";

const corsOptions = {
	origin: process.env.CORS_ORIGIN,
};
const app = express();

app.use(helmet());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.json({});
});

app.listen(process.env.PORT, () => {});
