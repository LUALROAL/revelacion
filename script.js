const script_de_google = 'https://script.google.com/macros/s/AKfycbwsRg1glTVXoS7qRXTwA4Vu0bh2YUjijwLSNDu1NmWaMOesMLdm7PGXqJQQR8zJQOve/exec';
const formulario_contacto = document.forms['formulario-contato'];

formulario_contacto.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    try {
        const response = await fetch(script_de_google, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: new FormData(formulario_contacto),
        });

        if (response.ok) {
            const data = await response.json();
            alert('¡Datos enviados con éxito!');
            formulario_contacto.reset();
            document.getElementById("guestFields").innerHTML = "";
        } else {
            alert('Hubo un problema al enviar los datos. Inténtelo de nuevo.');
            console.error('Respuesta del servidor no exitosa:', response);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('No se pudo enviar la información. Verifique su conexión o intente más tarde.');
    }
});





function updateFields() {
    const numGuests = parseInt(document.getElementById("numGuests").value);
    const guestFields = document.getElementById("guestFields");

    // Limpiar campos previos
    guestFields.innerHTML = "";

    if (isNaN(numGuests) || numGuests <= 0) {
        return; // No generar campos si el número es inválido o menor o igual a 0
    }

    for (let i = 1; i <= numGuests; i++) {
        const div = document.createElement("div");
        div.classList.add("person-info");
        div.innerHTML = `
            <label for="name${i}">Nombre de la persona ${i}:</label>
            <input type="text" id="name${i}" name="name${i}" placeholder="Nombre" required>
            <label for="age${i}">Edad de la persona ${i}:</label>
            <input type="number" id="age${i}" name="age${i}" placeholder="Edad" min="0" required>
        `;
        guestFields.appendChild(div);
    }
}