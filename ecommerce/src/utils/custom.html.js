export const resetPasswordHTML = ` <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
</head>
<body>
    <h2>Restablecimiento de Contraseña</h2>
    <p>Por favor, ingrese su dirección de correo electrónico y la nueva contraseña.</p>

    <form action="/procesar_reset" method="post">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required>

        <br>

        <label for="newPassword">Nueva Contraseña:</label>
        <input type="password" id="newPassword" name="newPassword" required>

        <br>

        <input type="submit" value="Restablecer Contraseña">
    </form>
</body>
</html>`