import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
const app = express();
const PORT = process.env.PORT || 5000;

const swaggerOptions: swaggerJsDoc.Options = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'My API',
			version: '1.0.0',
			description: 'API Documentation',
			contact: {
				name: 'Developer',
			},
			servers: [{ url: `http://localhost:${PORT}` }],
		},
	},
	apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

app.use('/api', routes);

export default app;
