<?php
// public/api/setup.php
require 'config.php';

try {
    // Tabela: Empresa / Perfil
    $pdo->exec("CREATE TABLE IF NOT EXISTS profile (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255),
        logo LONGTEXT,
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        address VARCHAR(255),
        addressShort VARCHAR(255),
        instagram VARCHAR(100),
        facebook VARCHAR(100),
        email VARCHAR(100),
        bio TEXT,
        experience VARCHAR(50)
    )");

    // Tabela: Categorias
    $pdo->exec("CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        image LONGTEXT
    )");

    // Tabela: Produtos
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        price DECIMAL(10,2),
        image LONGTEXT,
        category VARCHAR(100),
        tags TEXT
    )");
    // Tabela: Users (Múltiplos Acessos)
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL
    )");

    // Inserir Usuários Iniciais (Seed) se vazio
    $stmtUsers = $pdo->query("SELECT COUNT(*) FROM users");
    if ($stmtUsers->fetchColumn() == 0) {
        $hashKiyoshi = password_hash('SenhaKiyoshi123', PASSWORD_DEFAULT);
        $hashBia = password_hash('BiaDoces2026', PASSWORD_DEFAULT);
        
        $pdo->exec("INSERT INTO users (username, password_hash) VALUES 
            ('kiyoshi', '$hashKiyoshi'),
            ('bia', '$hashBia')
        ");
    }

    // Inserir Perfil Inicial (Seed) se vazio
    $stmt = $pdo->query("SELECT COUNT(*) FROM profile");
    if ($stmt->fetchColumn() == 0) {
        $pdo->exec("INSERT INTO profile (name, logo, phone, whatsapp, address, addressShort, instagram, facebook, email, bio, experience) 
        VALUES (
            'Bia Lobo', 
            './assets/logo.png', 
            '+55 61 99259-0209', 
            '5561992590209', 
            'Qri 15 casa 12c 5 - Santa Maria (Residencial Santos Dumont), Brasília - DF', 
            'Santa Maria, Brasília e região', 
            'bialobodoces', 
            'bialobodoces', 
            'contato@bialobodoces.com.br', 
            'Há mais de 8 anos, Bia Lobo transforma ingredientes simples em experiências doces únicas. Nascida em Brasília e apaixonada pela arte da confeitaria, ela descobriu seu dom de criar doces artesanais que contam histórias e conectam pessoas.', 
            '8+'
        )");
    }

    echo "<h1>Sucesso!</h1>";
    echo "<p>Banco de dados e tabelas configurados com sucesso.</p>";
    echo "<p>Você pode <strong>apagar este arquivo (setup.php)</strong> do servidor por segurança.</p>";
} catch (Exception $e) {
    echo "<h1>Erro</h1>";
    echo "<p>Erro ao configurar banco: " . $e->getMessage() . "</p>";
}
?>
