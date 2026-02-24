import express from "express";
import cors from 'cors';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import cardsRoutes from "./cards/index.js";
import customersRoutes from "./customers/index.js";
import paymentsRoutes from "./payments/index.js";
import '../docs/swagger.js';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'API de stripe node-express',
			version: '1.0.0',
		},
		servers: [
			{
				url: process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || 3000}`,
			},
		],
	},
	apis: [path.join(__dirname, '../docs/swagger.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use("/api/cards", cardsRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/payments", paymentsRoutes);

export default app;