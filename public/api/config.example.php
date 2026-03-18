<?php
// public/api/config.php
// Configuração do Banco de Dados (Hostinger)

$db_host = 'localhost'; // Normalmente 'localhost' na Hostinger
$db_user = 'u123456789_bialobo'; // Seu usuário do banco
$db_pass = 'SuaSenhaForte123!'; // A senha do banco
$db_name = 'u123456789_bialobodoces'; // O nome do banco

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Falha na conexão com o banco de dados. Verifique config.php']);
    exit;
}
?>
