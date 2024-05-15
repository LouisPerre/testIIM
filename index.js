import express from 'express';
import {exercice1} from './src/exercice1.js';
import {exercice2} from "./src/exercice2.js";
import {exercice3} from "./src/exercice3.js";
import {exercice4} from "./src/exercice4.js"; // Make sure to include the extension if "type": "module" is set
// import { CodeCovOpenTelemetry } from '@codecov/node-codecov-opentelemetry';
// import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
// import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
// import { SpanKind } from '@opentelemetry/api';
//
// const sampleRate = 1;
// const untrackedExportRate = 1;
// const code = 'production::v0.0.1'; //<environment>::<versionIdentifier>
// const provider = new NodeTracerProvider();
// provider.register();
//
// const codecov = new CodeCovOpenTelemetry({
//     repositoryToken: "0471f197-8230-4bc5-a8f6-4fefdd8ae903", //from repository settings page on Codecov.
//     environment: "production", //or others as appropriate
//     versionIdentifier: "v0.0.2", //semver, commit SHA, etc
//     filters: {
//         allowedSpanKinds: [SpanKind.SERVER],
//     },
//     codecovEndpoint: "api.codecov.io",
//     sampleRate,
//     untrackedExportRate,
//     code
// });

const app = express();

const PORT = 5555;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/exercice1', (req, res) => {
    res.redirect('/');
});

app.get('/exercice2', (req, res) => {
    const result = exercice2('./assets/exercice2.json')
    res.status(200).send(result);
});

app.get('/exercice3', (req, res) => {
    const result = exercice3('./assets/exercice3.json', 'bbbbbbbbbbbbbbb')
    res.status(200).send(result);
});

app.get('/exercice4', (req, res) => {
    const result = exercice4('./assets/exercice4.json')
    res.status(200).send(result);
});

app.get('/', (req, res) => {
    const result = exercice1('./assets/exercice1.json')
    res.status(200).send(result);
});

app.get('/healt', (req, res) => {
    res.status(200).send("Hello world")
})

export { app };

