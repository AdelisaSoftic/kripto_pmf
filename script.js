document.getElementById('signBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Molimo odaberite datoteku!');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('document', file);

    fetch('/sign', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseOutput').innerHTML = `
            <p><b>Poruka:</b> ${data.message}</p>
            <p><b>Potpis:</b> ${data.signature}</p>
            <p><b>Javni ključ:</b> <pre>${data.publicKey}</pre></p>
        `;
    })
    .catch(error => {
        console.error('Greška:', error);
    });
});
