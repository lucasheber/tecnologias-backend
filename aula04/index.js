const express = require('express');
const bodyparser = require('body-parser')
const app = express();
const port = 3003;

const verificaEmail = function (req, res, next) {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let email = req.body.email

    req.body.isValidEmail = String(email).toLocaleLowerCase().match(validRegex) !== null
    next();
}

app.use(bodyparser.urlencoded({extended: false}));
app.use('/contato', express.static(__dirname + '/public/contato'));

app.use('/contato', verificaEmail);
app.post('/contato', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});

app.all('*', (req, res) => {
    res.status(404).json({'status': false, 'message': 'a rota não existe ou foi removida...'});
});

app.listen(port, () => console.log(`Server is running on port ${port}`));