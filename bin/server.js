require ('dotenv').config();

const app = require('../src/app');
const port = process.env.PORT || '4000';

const server = app.listen(port, ()=> {
    console.log('API rodando na porta ' + port);
});