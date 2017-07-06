<!DOCTYPE html>
<html dir="ltr" lang="en" class="no-js">
<head>
	<meta charset="utf-8">
	<title>Loïc Hamet _ Web development</title>

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
				</div>
				<div class="cmder__remote">
					<a href="/home" class="cmder__button cmder__button--home"></a>
					<a href="/menu" class="cmder__button cmder__button--menu"><span></span></a>
					<a href="/help" class="cmder__button cmder__button--help">?</a>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="/assets/js/app.js"></script>
</body>
