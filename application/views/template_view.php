<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<title>Редактор статей</title>
        <link rel="stylesheet" type="text/css" href="/editor/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="/editor/css/style.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <link rel="stylesheet" href="/editor/trumbowyg_master/dist/ui/trumbowyg.min.css">
        <script src="/editor/js/jquery-3.3.1.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="/editor/js/bootstrap.min.js"></script>
        <script src="/editor/js/popper.min.js"></script>
        <script src="/editor/trumbowyg_master/dist/trumbowyg.min.js"></script>
        <script src="/editor/trumbowyg_master/dist/plugins/upload/trumbowyg.upload.min.js"></script>
	</head>
	<body>
		<div class="workarea">
			<div class="container">
                <?php include 'application/views/'.$content_view; ?>
			</div>
		</div>
        <script src="/editor/js/script.js"></script>
	</body>
</html>