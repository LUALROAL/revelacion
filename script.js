    // URL del Google Apps Script (asegúrate de que está configurado para POST)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwNMUDDhUtArrvuXgVvfeplbcLTqBpRcZ4L_XsWiSDzzIPX6WUVUylhIGQKYjIvcfTZ/exec';

    // Espera que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.forms['formulario-contato'];

        form.addEventListener('submit', e => {
            e.preventDefault();

            // Mostrar el mensaje de carga
            document.getElementById('loading').style.display = 'block';

            // Realizar solicitud POST
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                // Mostrar mensaje de éxito
                alert("¡Gracias! El formulario ha sido enviado");

                // Ocultar el mensaje de carga
                document.getElementById('loading').style.display = 'none';
            })
            .then(() => { window.location.reload(); })
            .catch(error => {
                // Mostrar error y ocultar el loading
                console.error('¡Error!', error.message);
                document.getElementById('loading').style.display = 'none';
            });
        });

        // Escuchar el cambio en el número de invitados
        document.getElementById("numGuests").addEventListener("input", updateFields);
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



    document.addEventListener("DOMContentLoaded", () => {
        const checkbox = document.querySelector('input[type="checkbox"]');
        const content = document.getElementById("content");
  
        // Escuchar cambios en el checkbox
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            content.style.visibility = "visible";
          } else {
            content.style.visibility = "hidden";
          }
        });
      });
      
      