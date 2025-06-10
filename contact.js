let mensajeTimeout; // Variable global para controlar el temporizador

document.querySelector('#formulario form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const data = new URLSearchParams({
        nombre: document.getElementById('formNombre').value,
        apellidos: document.getElementById('formApellidos').value,
        correo: document.getElementById('formCorreo').value,
        mensaje: document.getElementById('formMensaje').value
    });

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzECCKvN227rzKeSTU9S_7LfIlvfzQpkSMQtuC5rvqTs4KlWl2d_2uPs6ixv-Q5cC-0/exec', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo enviar el mensaje. Intenta de nuevo más tarde.');
        }

        mostrarMensaje('¡Mensaje enviado!', true);
        this.reset();
    } catch (error) {
        mostrarMensaje(error.message, false);
    }
});

function mostrarMensaje(texto, exito = true) {
    const mensajeDiv = document.getElementById('mensaje-exito');
    mensajeDiv.textContent = texto;
    mensajeDiv.style.display = 'block';
    mensajeDiv.style.color = '#155724';
    mensajeDiv.style.background = '#d4edda';
    mensajeDiv.style.border = '1px solid #c3e6cb';
    mensajeDiv.style.padding = '16px 24px';
    mensajeDiv.style.marginTop = '24px';
    mensajeDiv.style.borderRadius = '8px';
    mensajeDiv.style.textAlign = 'center';
    mensajeDiv.style.fontWeight = 'bold';
    mensajeDiv.style.fontSize = '1.1em';
    mensajeDiv.style.boxShadow = '0 2px 8px rgba(40,167,69,0.08)';

    // Si es error, cambia a rojo
    if (!exito) {
        mensajeDiv.style.color = '#721c24';
        mensajeDiv.style.background = '#f8d7da';
        mensajeDiv.style.border = '1px solid #f5c6cb';
        mensajeDiv.style.boxShadow = '0 2px 8px rgba(220,53,69,0.08)';
    }

    if (mensajeTimeout) clearTimeout(mensajeTimeout);
    mensajeTimeout = setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 5000);
}