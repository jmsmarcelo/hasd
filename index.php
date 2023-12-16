<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow|Lilita+One|Berkshire+Swash">
    <link rel="stylesheet" href="classes/style.css">
    <title>Hinário Adventista</title>
    <?php
    global $hymns;
    $g_hymn = '';
    require_once('classes/hymns.php');
    if(preg_match("/.*h(\d{3}).*/", $_SERVER['REQUEST_URI'], $hymn)) {
        $g_hymn = $hymn;
        if(intval($g_hymn) > sizeof($hymns)) $g_hymn = '';
    } else $g_hymn = '';
    echo '<meta property="og:image" content="'. $_SERVER['HTTP_HOST']. '/classes/images/logo-hasd_logo.png">'.
        '<script>'.
        "var hymns = ". json_encode($hymns). ",\n".
        "gHymn = \"". $g_hymn. "\";\n".
        '</script>'.
        '<meta name="description" content="'. ($g_hymn != "" ? $hymns[$g_hymn]['tt'] : "Playback/+Voz"). '">';
    ?>
    <script src="classes/elems.js"></script>
    <script src="classes/funcs.js"></script>
    <script src="classes/root.js"></script>
</head>
<body>
</body>
</html>