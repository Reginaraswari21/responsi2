<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, HEAD, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: content-type, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');
$koneksi = mysqli_connect('localhost', 'root', '', 'belajarlogin') or die('koneksi
gagal');
