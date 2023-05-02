<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>admin</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<link rel="stylesheet" href="trumbowyg_master/dist/ui/trumbowyg.min.css">
		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/popper.min.js"></script>
		<script src="trumbowyg_master/dist/trumbowyg.min.js"></script>
		<script src="trumbowyg_master/dist/plugins/upload/trumbowyg.upload.min.js"></script>

		<style>
			strong
			{
				font-weight: bold;
			}

			.trumbowyg-editor h1
			{
				font-size: 2.5rem !important;
			}

			.trumbowyg-editor blockquote
			{
				padding-left: 10px;
			    padding-right: 10px;
			    padding-top: 5px;
			    padding-bottom: 5px;
			    background-color: rgba(255, 251, 69, 0.3);
			}
		</style>
	</head>

	<body>
		
						<div class="field l-1">
							<label>Text:</label>
							<div class="texter"></div>
						</div>
						<div class="bottom-line">
							<input type="submit" class="button_add_article" value="Add article" />
						</div>




			
			<script>
				$('.texter').each(function()
				{
					$('.texter').trumbowyg(
					{
				    	btns: 
				    	[
				        	['viewHTML'],
				            ['undo', 'redo'], // Only supported in Blink browsers
				            ['formatting'],
				            ['strong', 'em', 'del'],
				            ['superscript', 'subscript'],
				            ['link'],
				            ['insertImage', 'upload'],
				            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
				            ['unorderedList', 'orderedList'],
				            ['horizontalRule'],
				            ['removeformat'],
				            ['fullscreen'],
				    	],
				    	plugins: 
				    	{
				        	upload: 
				        	{
				            	serverPath: 'blog/photo_uploader.php',
				            	fileFieldName: 'image',
				            	success: function(data, trumbowyg, _$modal, values) 
				            	{
								  trumbowyg.doc.execCommand("insertHTML", false, "<img src='" + data.url + "' alt='" +  values.alt + "'>")
								  trumbowyg.closeModal();
								}
				        	}
				    	}
					});
				});				
			</script>

			
		</div>


		<script src="js/adminblog.js"></script>
	</body>
</html>
<script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>