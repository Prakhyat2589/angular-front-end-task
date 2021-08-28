import app from './app';
import * as db from './db';

db.init().then(() => console.log('Database initialised'));

const server = app.listen(app.get('port'), () => {
  console.log('Running at http://127.0.0.1:%d', app.get('port'));
});

process.on('exit', () => {
  db.close();
  server.close();
});
