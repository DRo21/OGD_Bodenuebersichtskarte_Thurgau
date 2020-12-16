<?php

$method = $_SERVER["REQUEST_METHOD"];

if ($method != "GET") {
    http_response_code(405);
    die();
}

if (!isset($_GET["layer"])) {
    http_response_code(400);
    die();
}
$layer = $_GET["layer"];

$localsFile = file_get_contents("./data/lang.json");
$locals = json_decode($localsFile, true);

if (!key_exists($layer, $locals["layers"])) {
    http_response_code(404);
    die();
}

$legendId = $locals["layers"][$layer]["legend"];
$legend = $locals["legends"][$legendId];

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($legend);

?>
