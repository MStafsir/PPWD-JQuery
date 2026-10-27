<?php
/**
 * config.php
 * -----------------------------------------
 * File konfigurasi koneksi database PDO yang fleksibel:
 * Mendukung Laragon/XAMPP (port 3306, pass kosong)
 * dan MAMP (port 8889/socket, user root, pass root).
 */

$dbname = 'donasi_app';
$pdo = null;

// Daftar kemungkinan konfigurasi database lokal (Laragon, XAMPP, MAMP)
$dbConfigs = [
    // 1. MAMP macOS (port 8889 atau unix socket)
    [
        'dsn'  => "mysql:host=127.0.0.1;port=8889;dbname=$dbname;charset=utf8mb4",
        'user' => 'root',
        'pass' => 'root'
    ],
    [
        'dsn'  => "mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=$dbname;charset=utf8mb4",
        'user' => 'root',
        'pass' => 'root'
    ],
    // 2. Laragon / XAMPP default (port 3306, password kosong)
    [
        'dsn'  => "mysql:host=localhost;port=3306;dbname=$dbname;charset=utf8mb4",
        'user' => 'root',
        'pass' => ''
    ],
    [
        'dsn'  => "mysql:host=127.0.0.1;port=3306;dbname=$dbname;charset=utf8mb4",
        'user' => 'root',
        'pass' => ''
    ],
];

foreach ($dbConfigs as $cfg) {
    try {
        $pdo = new PDO($cfg['dsn'], $cfg['user'], $cfg['pass']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        break; // Berhasil terhubung, keluar loop
    } catch (PDOException $e) {
        $pdo = null;
    }
}