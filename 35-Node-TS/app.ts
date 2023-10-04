import express from 'express'

import bodyParser, { BodyParser } from 'body-parser';

import todosRoutes from './routes/todos'


const app = express();

app.use(bodyParser.json())

app.use()

app.listen(3000)