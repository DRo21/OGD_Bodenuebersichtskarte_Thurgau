<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OGD Bodenübersicht</title>
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
        <h1>OGD Bodenübersicht</h1>
    </header>

    <main>
        <div id="sidebar">
            <p>I am a placeholder 😎</p>
        </div>
        <!-- Leaflet map container -->
        <div id="map"></div>
    </main>

    <footer>
        <p>Copyright &copy <?php echo date("Y"); ?> Elias Baumgartner, Dario Romandini, Maximilian Hubrath, Michel Fäh</p>
    </footer>

</body>
</html>
