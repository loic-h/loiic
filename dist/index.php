<!DOCTYPE html>
<html dir="ltr" lang="en" class="no-js">
<head>
	<meta charset="utf-8">
	<title>Loïc Hamet _ Web development</title>

	<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
	<link rel="manifest" href="/assets/favicons/manifest.json">
	<link rel="mask-icon" href="/assets/favicons/safari-pinned-tab.svg" color="#66ffc1">
	<link rel="shortcut icon" href="/assets/favicons/favicon.ico">
	<meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
	<meta name="theme-color" content="#343c3f">

	<meta name="viewport" content="width=device-width,initial-scale=1.0" />
	<link rel="stylesheet" href="/assets/css/app.css" />
</head>

<body class="layout">
	<div id="container">
		<div class="loader"></div>
		<div id="layout">
			<div class="log"></div>
			<input class="dummy" type="text" value="" autocapitalize="none"/>
			<div class="cmder">
				<div class="cmder-input">
					<div class="cmder-input__container">
						<span class="cmder-input__input" contenteditable="true"></span>
						<span class="cursor"></span>
					</div>
					<span class="cmder-placeholder"></span>
				</div>
				<div class="cmder__remote">
					<a href="/home" class="cmder__button cmder__button--home" title="home"></a>
					<a href="/menu" class="cmder__button cmder__button--menu" title="menu"><span></span></a>
					<a href="/help" class="cmder__button cmder__button--help" title="help">?</a>
				</div>
			</div>
		</div>
		<div id="freeze"></div>
	</div>
	<script type="text/javascript" src="/assets/js/app.js"></script>
</body>
