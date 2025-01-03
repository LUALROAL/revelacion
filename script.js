const script_de_google = 'https://script.google.com/macros/s/AKfycbyw-vwCtIA0NHRB72H270PxIQXWXCPB6a2M9cU9gA7vGbYDuUBO-C81wjp9grJx8ern/exec';
const formulario_contacto = document.forms['formulario-contato'];

formulario_contacto.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    try {
        const response = await fetch(script_de_google, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', // Asegura la recepción de JSON
            },
            body: new FormData(formulario_contacto),
        });

        if (response.ok) {
            const data = await response.json(); // Asegúrate de que el script devuelva JSON
            alert('¡Datos enviados con éxito!');
            formulario_contacto.reset(); // Reinicia el formulario tras el envío
            document.getElementById("guestFields").innerHTML = ""; // Limpia los campos generados dinámicamente
        } else {
            alert('Hubo un problema al enviar los datos. Inténtelo de nuevo.');
            console.error('Respuesta del servidor no exitosa:', response);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('No se pudo enviar la información. Verifique su conexión o intente más tarde.');
    }
});

function doPost(e) {
    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader("Access-Control-Allow-Origin", "*");
}
