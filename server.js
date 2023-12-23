const express = require('express');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(fileUpload());

// Funkcija za generiranje ključeva
function generateKeys() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    return { publicKey, privateKey };
}

// Funkcija za stvaranje digitalnog potpisa
function createDigitalSignature(privateKey, document) {
    const signer = crypto.createSign('sha256');
    signer.update(document);
    signer.end();
    const signature = signer.sign(privateKey);
    return signature.toString('base64');
}

// POST zahtjev za potpisivanje dokumenta
app.post('/sign', (req, res) => {
    if (!req.files || !req.files.document) {
        return res.status(400).send('Nema datoteke.');
    }

    const document = req.files.document.data.toString('utf8');
    const { publicKey, privateKey } = generateKeys();
    const signature = createDigitalSignature(privateKey, document);

    res.send({
        message: 'Dokument je uspješno potpisan.',
        signature: signature,
        publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' })
    });
});

app.listen(port, () => {
    console.log(`Server pokrenut na portu ${port}`);
});
