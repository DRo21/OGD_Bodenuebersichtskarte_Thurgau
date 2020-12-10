<?php

$validLangs = ['de', 'fr', 'it', 'en'];

// Check if language paramter exists if not default lang is de.
// If it set to an unsupported language then return
// 422 http response code
$lang = 'de';
if (isset($_GET['lang'])) {
    $lang = $_GET['lang'];
    if (!in_array($lang, $validLangs)) {
        http_response_code(422);
        die();
    }
}

$localsFile = file_get_contents("./lang/lang.json");
$locals = json_decode($localsFile, true);

?>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $locals["header"]["title"][$lang]; ?></title>
    <meta name="author" content="Elias Baumgartner, Dario Romandini, Maximilian Hubrath, Michel Fäh">
    <meta name="description" content="Kartendaten über die Bodenbeschaffenheit im Thurgau">
    <!-- Leaflet Import -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <!-- Scripts -->
    <script src="/src/js/index.js" defer></script>
    <!-- Stylesheet -->
    <link rel="stylesheet" href="/src/css/style.css">
</head>

<body>

    <header>
        <h1><?php echo $locals["header"]["title"][$lang]; ?></h1>
        <img id="logo"src="src/res/logo-kanton-thurgau.svg">
        <img id="bar" src="src/res/TGBar.png">
    </header>

    <main>
        <div id="sidebar">
            <select name="" id="layer-select"></select>
            <input type="range" min="0" max="100" value="80" id="slider">
            <div id="legend-container">
                <img src="" id="legend__image" />
            </div>
        </div>
        <!-- Leaflet map container -->
        <div id="map"></div>
    </main>

    <footer>
        <p>Copyright &copy <?php echo date("Y"); ?> Elias Baumgartner, Dario Romandini, Maximilian Hubrath, Michel Fäh</p>
    </footer>

</body>

</html>
