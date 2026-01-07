<?php
/**
 * API de Contacto - Nogales Apartamentos
 * 
 * Recibe formularios de contacto, guarda en MySQL y envía emails
 * 
 * IMPORTANTE: Actualizar credenciales antes de subir a producción
 */

// Headers CORS y JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit();
}

// ============================================================
// CONFIGURACIÓN - ACTUALIZAR ANTES DE PRODUCCIÓN
// ============================================================

// Base de datos
// TODO: Actualizar con credenciales reales del hosting de Nogales
define('DB_HOST', 'localhost');
define('DB_NAME', 'NOMBRE_BASE_DATOS');
define('DB_USER', 'USUARIO_BASE_DATOS');
define('DB_PASS', 'PASSWORD_BASE_DATOS');

// SMTP
// TODO: Actualizar con credenciales SMTP del hosting
define('SMTP_HOST', 'SERVIDOR_SMTP');
define('SMTP_PORT', 465);
define('SMTP_USER', 'contacto@dominio-nogales.com.ar');
define('SMTP_PASS', 'PASSWORD_SMTP');
define('SMTP_SECURE', 'ssl');

// Emails destino
// MODO TEST: Enviar a larrozaezequiel@gmail.com
// MODO PROD: Cambiar a nogales@viewdesarrollos.com.ar
define('EMAIL_TO', 'larrozaezequiel@gmail.com');  // TODO: Cambiar en producción
define('EMAIL_CC', 'contacto@dominio-nogales.com.ar');
define('EMAIL_FROM_NAME', 'Nogales Apartamentos');

// ============================================================
// FIN CONFIGURACIÓN
// ============================================================

// Incluir PHPMailer
require_once __DIR__ . '/phpmailer/PHPMailer.php';
require_once __DIR__ . '/phpmailer/SMTP.php';
require_once __DIR__ . '/phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Obtener datos del formulario
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
    exit();
}

// Validar campos requeridos
$required = ['name', 'email', 'phone', 'message'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Campo requerido: $field"]);
        exit();
    }
}

// Sanitizar datos
$name = htmlspecialchars(strip_tags(trim($input['name'])));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(strip_tags(trim($input['phone'])));
$source = isset($input['source']) ? htmlspecialchars(strip_tags(trim($input['source']))) : '';
$message = htmlspecialchars(strip_tags(trim($input['message'])));
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Validar email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email inválido']);
    exit();
}

// Traducir source
$sourceLabels = [
    'instagram' => 'Instagram',
    'recommendation' => 'Por recomendación',
    'google' => 'Búsqueda en Google',
    'portal' => 'Portal de turismo',
    'other' => 'Otra'
];
$sourceLabel = $sourceLabels[$source] ?? $source;

try {
    // Conectar a MySQL
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    // Insertar en base de datos
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, phone, source, message, ip_address, created_at)
        VALUES (:name, :email, :phone, :source, :message, :ip, NOW())
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':phone' => $phone,
        ':source' => $source,
        ':message' => $message,
        ':ip' => $ip
    ]);

    $contactId = $pdo->lastInsertId();

    // Enviar email
    $mail = new PHPMailer(true);

    // Configuración SMTP
    $mail->isSMTP();
    $mail->Host = SMTP_HOST;
    $mail->SMTPAuth = true;
    $mail->Username = SMTP_USER;
    $mail->Password = SMTP_PASS;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Port = SMTP_PORT;
    $mail->CharSet = 'UTF-8';

    // Remitente y destinatarios
    $mail->setFrom(SMTP_USER, EMAIL_FROM_NAME);
    $mail->addAddress(EMAIL_TO);
    if (EMAIL_CC && EMAIL_CC !== EMAIL_TO) {
        $mail->addCC(EMAIL_CC);
    }
    $mail->addReplyTo($email, $name);

    // Contenido del email
    $mail->isHTML(true);
    $mail->Subject = "Nueva consulta desde la web - Nogales Apartamentos";

    $mail->Body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #5BA3C0; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #5BA3C0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>Nueva Consulta</h1>
                <p>Nogales Apartamentos</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Nombre:</span><br>
                    {$name}
                </div>
                <div class='field'>
                    <span class='label'>Email:</span><br>
                    <a href='mailto:{$email}'>{$email}</a>
                </div>
                <div class='field'>
                    <span class='label'>Teléfono:</span><br>
                    <a href='tel:{$phone}'>{$phone}</a>
                </div>
                " . ($sourceLabel ? "
                <div class='field'>
                    <span class='label'>¿Cómo nos conoció?</span><br>
                    {$sourceLabel}
                </div>
                " : "") . "
                <div class='field'>
                    <span class='label'>Mensaje:</span><br>
                    " . nl2br($message) . "
                </div>
            </div>
            <div class='footer'>
                <p>ID de contacto: #{$contactId}</p>
                <p>Recibido: " . date('d/m/Y H:i') . "</p>
                <p>IP: {$ip}</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Versión texto plano
    $mail->AltBody = "
Nueva consulta desde la web - Nogales Apartamentos

Nombre: {$name}
Email: {$email}
Teléfono: {$phone}
" . ($sourceLabel ? "¿Cómo nos conoció?: {$sourceLabel}\n" : "") . "
Mensaje:
{$message}

---
ID: #{$contactId}
Fecha: " . date('d/m/Y H:i') . "
    ";

    $mail->send();

    // Respuesta exitosa
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje enviado correctamente',
        'id' => $contactId
    ]);

} catch (PDOException $e) {
    error_log("Error DB Nogales: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al guardar el mensaje']);
} catch (Exception $e) {
    error_log("Error Email Nogales: " . $e->getMessage());
    // Aunque falle el email, el contacto se guardó
    echo json_encode([
        'success' => true,
        'message' => 'Mensaje recibido (notificación pendiente)',
        'id' => $contactId ?? null
    ]);
}