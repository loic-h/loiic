<?php
require __DIR__ . '/../vendor/autoload.php';

$data = array();

$configFile = __DIR__ . '/config.yml';
$data['config'] = spyc_load_file($configFile);

$cmdPath = __DIR__ . '/cmd/';
$files = array_diff(scandir($cmdPath), array('.', '..'));

foreach ($files as $file) {
	$d = spyc_load_file($cmdPath . $file);
	$data['cmd'][$d['cmd']] = $d;
}

header('Content-Type: application/json');
echo json_encode($data);

?>
