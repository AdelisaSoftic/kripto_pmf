document.getElementById('signBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('document', file);

    // Logovanje sadržaja formData
    for (let key of formData.keys()) {
        console.log(key, formData.get(key));
    }

    fetch('http://localhost:3000/sign', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('signatureOutput').innerText = `Potpis: ${data.signature}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
