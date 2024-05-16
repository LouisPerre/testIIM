import express from 'express';
import { exercice1 } from './src/exercice1.js';
import { exercice2 } from "./src/exercice2.js";
import { exercice3 } from "./src/exercice3.js";
import { exercice4 } from "./src/exercice4.js";

const app = express();

const PORT = 5555;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/exercice1', (req, res) => {
    res.redirect('/');
});

app.get('/exercice2', (req, res) => {
    const result = exercice2('./assets/JSON/exercice2.json')
    res.status(200).send(result);
});

app.get('/exercice3', (req, res) => {
    const result = exercice3('./assets/JSON/exercice3.json', 'bbbbbbbbbbbbbbb')
    res.status(200).send(result);
});

app.get('/exercice4', (req, res) => {
    const result = exercice4('./assets/JSON/exercice4.json')
    res.status(200).send(result);
});

app.get('/', (req, res) => {
    const result = exercice1('./assets/JSON/exercice1.json')
    res.status(200).send(result);
});

app.get('/healt', (req, res) => {
    res.status(200).send("Hello world")
})

export { app };

