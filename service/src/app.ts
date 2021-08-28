import * as bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import * as userController from './user/user.controller';

const app = express();

app.set('port', process.env.PORT || 8080);

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

app.set('json spaces', 2);

app.get('/users', userController.getPage);
app.get('/users/:userId', userController.get);
app.post('/users', userController.create);
app.put('/users/:userId', userController.update);
app.delete('/users/:userId', userController.deleteOne);

export default app;
