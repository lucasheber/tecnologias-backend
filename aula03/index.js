const express = require('express');
const app = express();

const port = 3003;

let usuarios = [
    { id: 1, name: "lucas" },
    { id: 2, name: "jose" },
    { id: 3, name: "joão" },
    { id: 4, name: "maria" },
    { id: 5, name: "marcia" },
];

app.get('/', (req, res) => {
    res.send('Você está na pagina inicial;')
});

app.get('/api/cep/:cep([0-9][0-9][0-9][0-9][0-9]-[0-9][0-9][0-9])', (req, res) => {
    res.send('Você está buscando pelo cep: ' + req.params.cep)
});

app.get('/api/usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.get('/api/usuario/:id([0-9])', (req, res) => {
    res.status(200).json(usuarios.filter(function(o){return o.id == req.params.id;}));
});

app.post('/api/usuario', (req, res) => {
    res.status(200).json({status: true});
});

app.all('*', (req, res) => {
    res.status(404).json({'status': false, 'message': 'a rota não existe ou foi removida...'});
});

app.listen(port, () => console.log(`Server is running on port ${port}`));