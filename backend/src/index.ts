import app from './app.js';
import 'dotenv/config';

const PORT = Number(process.env.PORT) || 4000;
const dbUrl = process.env.DATABASE_URL;

app.listen({ port: PORT, host: '0.0.0.0' }, () => {
  console.log('Server is running on http://localhost/' + PORT);
  console.log('URL do banco:', dbUrl);
});
