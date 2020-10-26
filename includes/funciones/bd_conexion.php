<?php
    define('GDLWEBCAMP1_HOST', 'localhost');
    define('GDLWEBCAMP1_DB_USUARIO', 'root');
    define('GDLWEBCAMP1_DB_PASSWORD', '');
    define('GDLWEBCAMP1_DB_DATABASE', 'gdlwebcamp1');

    $conn = new mysqli(GDLWEBCAMP1_HOST, GDLWEBCAMP1_DB_USUARIO, GDLWEBCAMP1_DB_PASSWORD, GDLWEBCAMP1_DB_DATABASE);

    if($conn->connect_error) {
      echo $conn->connect_error;
    }
