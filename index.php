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

$localsFile = file_get_contents("./data/lang.json");
$locals = json_decode($localsFile, true);

?>

<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $locals["header"]["title"][$lang]; ?></title>
    <meta name="author" content="Elias Baumgartner, Dario Romandini, Maximilian Hubrath, Michel Fäh">
    <meta name="description" content="Übersichtkarte mit typischen Böden und Bodengesellschaften sowie deren Eigenschaften in der Tiefe">
    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/src/res/fav/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/src/res/fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/src/res/fav/favicon-16x16.png">
    <link rel="manifest" href="/src/res/fav/site.webmanifest">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
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
        <h1 class="header__title"><?php echo $locals["header"]["title"][$lang]; ?></h1>
        <img class="header__logo"src="src/res/logo-kanton-thurgau.svg">
    </header>

    <div class="sidebar">
        <h3 class="sidebar__title"><?php echo $locals["sidebar"]["0"][$lang]; ?></h3>
        <select id="layer-select" class="select select--block">
            <?php foreach($locals["layers"] as $layerName => $layer): ?>
            <option value="<?php echo $layerName; ?>"><?php echo $layer["displayName"][$lang]; ?></option>
            <?php endforeach; ?>
        </select>
        <h3 class="sidebar__title"><?php echo $locals["sidebar"]["1"][$lang]; ?></h3>
        <input type="range" min="0" max="100" value="80" id="slider">
        <h3 class="sidebar__title"><?php echo $locals["sidebar"]["2"][$lang]; ?></h3>
        <div class="sidebar__legend"></div>
    </div>
    <!-- Leaflet map container -->
    <div class="map" id="map"></div>

    <footer>
        <div class="footer__content">
            <h1 class="footer-cont__title"><?php echo $locals["footer"]["title"][$lang]; ?></h1>
            <p><?php echo $locals["footer"]["desc"][$lang]; ?></p>
            <a class="footer-cont__link" href="https://opendata.swiss/de/dataset/bodenubersichtskarte"><?php echo $locals["footer"]["link"][$lang]; ?></a>
            <label for="lang-select"><?php echo $locals["footer"]["label"][$lang]; ?></label>
            <select id="lang-select" class="select">
                <option value="de"><?php echo $locals["footer"]["lang"]["de"][$lang]; ?></option>
                <option value="fr"><?php echo $locals["footer"]["lang"]["fr"][$lang]; ?></option>
                <option value="it"><?php echo $locals["footer"]["lang"]["it"][$lang]; ?></option>
                <option value="en"><?php echo $locals["footer"]["lang"]["en"][$lang]; ?></option>
            </select>
        </div>
        <div class="footer__copy">
            <p>Copyright &copy <?php echo date("Y"); ?> Elias Baumgartner, Dario Romandini, Maximilian Hubrath, Michel Fäh</p>
        </div>
    </footer>

</body>

</html>
