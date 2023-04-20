document.addEventListener('DOMContentLoaded', function() {
    // Configurar reglas de validación y mensajes de error usando jQuery validation
    $('#formularioProceso').validate({
        rules: {
            nombre: 'required',
            email: {
                required: true,
                email: true
            },
            servicio: 'required',
            duracion: 'required',
            telefono: 'required',
        },
        messages: {
            nombre: 'Por favor ingrese su nombre',
            email: 'Por favor ingrese su email',
            servicio: 'Por favor seleccione el anuncio deseado',
            duracion: 'Por favor seleccione los segundos de duración del anuncio (de 5 a 30 seg)',
            telefono: 'Por favor ingrese su teléfono',
        },
        submitHandler: function(form) {
            // Obtener los valores de los campos del formulario
            var nombre = document.getElementById('nombre').value;
            var email = document.getElementById('email').value;
            var telefono = document.getElementById('telefono').value;
            var duracion = document.getElementById('duracion').value;
            var servicio = document.getElementById('servicio').value;

                        // Realizar cálculos para la cotización
                        var precio;
                            if (servicio === "facebook-ads"){
                                precio = 500;
                            }else if (servicio === "instagram-ads"){
                                precio = 700;
                            }else {
                                precio = 900;
                            }
                        ;
                        var subtotal = precio * duracion;
                        var impuesto = subtotal * 0.21; // Se asume un impuesto del 21%
                        var total = subtotal + impuesto;

            //Generar el resumen de la informacion ingresado por el usuario
            var resumenInformacion = 'Información:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'Email: ' + email + '\n' +
                'Teléfono: ' + telefono + '\n' +
                'servicio: ' + servicio + '\n' +
                'duracion: ' + duracion + " segundos" + '\n';

            // Generar el resumen de la cotización
            var resumenCotizacion = 'Cotizacion:\n\n' +
                'Nombre: ' + nombre + '\n' +
                'Email: ' + email + '\n' +
                'Teléfono: ' + telefono + '\n' +
                'servicio: ' + servicio + '\n' +
                'duracion: ' + duracion + " segundos" + '\n' +
                'Subtotal: $' + subtotal + '\n' +
                'Impuesto (21%): $' + impuesto + '\n' +
                'Total: $' + total;

            // Mostrar la cotización en un cuadro de diálogo
            alert(resumenInformacion);
            

            // Continuar con el resto del código de generación del PDF y descarga del archivo, si es necesario
            // ...
            // Crear un nuevo objeto jsPDF
            var pdf = new jsPDF();

            // Agregar el resumen al documento PDF
            pdf.text(resumenCotizacion, 10, 10);

            // Generar el archivo PDF como Blob
            var pdfBlob = pdf.output('blob');

            // Crear un enlace de descarga
            var downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(pdfBlob);
            downloadLink.download = 'resumen_proceso.pdf';
            downloadLink.click();

            // Liberar el objeto Blob
            URL.revokeObjectURL(pdfBlob);
        
        }
    });

    // Configurar reglas de validación y mensajes de error usando jQuery validation para el formulario de contacto
    $('#formularioContacto').validate({
        rules: {
            nombreContacto: 'required',
            apellidoContacto: 'required',
            emailContacto: {
                required: true,
                email: true
            },
            mensaje: 'required'
        },
        messages: {
            nombreContacto: 'Por favor ingrese su nombre',
            apellidoContacto: 'Por favor ingrese su apellido',
            emailContacto: {
                required: 'Por favor ingrese su dirección de correo electrónico',
                email: 'Por favor ingrese una dirección de correo electrónico válida'
            },
            mensaje: 'Por favor ingrese un mensaje'
        },
        submitHandler: function(form) {
            // Obtener los valores de los campos del formulario
            var nombreContacto = $('#nombreContacto').val();
            var apellidoContacto = $('#apellidoContacto').val();
            var emailContacto = $('#emailContacto').val();
            var mensaje = $('#mensaje').val();

            // Hacer la petición AJAX para enviar los datos al servidor
            $.ajax({
                url: 'https://reqres.in/api/users?page=2', // URL de regres.in para la petición de contacto
                method: 'POST', // Método HTTP POST
                data: {
                    nombre: nombreContacto,
                    email: emailContacto,
                    mensaje: mensaje
                },
                success: function(response) {
                    // Aquí puedes manejar la respuesta del servidor si es necesario
                    console.log('Éxito:', response);
                    // Puedes mostrar un mensaje de éxito al usuario
                    alert('¡Datos enviados con éxito!');
                },
                error: function(xhr, status, error) {
                    // Aquí puedes manejar los errores de la petición AJAX si es necesario
                    console.error('Error:', error);
                    // Puedes mostrar un mensaje de error al usuario
                    alert('Error al enviar el mensaje. Por favor inténtelo nuevamente.');
                }
            });
        }
    });
});

  


