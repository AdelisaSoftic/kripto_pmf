const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors'); 
const crypto = require('crypto');
const app = express();
const port = 3000;

// Koristite CORS
app.use(cors());
app.use(fileUpload());

// Generiranje ključeva
function generateKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    return { publicKey, privateKey };
}

// Kreiranje digitalnog potpisa
function createDigitalSignature(privateKey, document) {
    const signer = crypto.createSign('sha256');
    signer.update(document);
    signer.end();
    return signer.sign(privateKey, 'base64');
}

app.post('/sign', (req, res) => {
    if (!req.files || !req.files.document) {
        return res.status(400).send('No file uploaded.');
    }

    const document = req.files.document.data.toString('utf8');
    const { privateKey } = generateKeys();
    const signature = createDigitalSignature(privateKey, document);

    res.send({ signature });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
