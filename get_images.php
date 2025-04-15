<?php
$imageDir = 'img/Ogmur/';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
$images = [];

if (is_dir($imageDir)) {
    $files = scandir($imageDir);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($extension, $allowedExtensions)) {
                $images[] = $file;
            }
        }
    }
}

header('Content-Type: application/json');
echo json_encode($images);
?>