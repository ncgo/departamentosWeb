const app = require('./messages');

const port = 3000;

app.listen(port, () => {
    console.log('el servidor esta corriendo en el puerto', port);
});