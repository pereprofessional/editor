$('.add-article-form').submit(function(e) 
{
	e.preventDefault(); 

	var form = $(this);
	var url = form.attr('action');

	
	var articleName = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=name]').val();
	var slugName = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=slug]').val();
	var tags = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=tags]').val();
	var category = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=category]').val();
	var metaKeywords = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=meta_keywords]').val();
	var metaDescription = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=meta_description]').val();
	var text = $(this).children('.l-1').children('.trumbowyg-box').children('.trumbowyg-editor').html();
	var reason = 'add_article';
	var previewPhoto = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=preview_photo_input]').val();
		


	console.log(`Article name: ` + articleName);
	console.log(`Slug name: ` + slugName);
	console.log(`Tags: ` + tags);
	console.log(`Category: ` + category);
	console.log(`Meta keywords: ` + metaKeywords);
	console.log(`Meta description: ` + metaDescription);
	console.log(`Text: ` + text);
	console.log(`Preview photo: ` + previewPhoto);
	console.log(`-----------------------`);

	var jsonString = btoa(encodeURIComponent(articleName + '{divider}' + slugName + '{divider}' + tags + '{divider}' + category + '{divider}' + metaKeywords + '{divider}' + metaDescription + '{divider}' + text + '{divider}' + reason + '{divider}' + previewPhoto));

	/*$.get(url + '?data=' + jsonString, function(data)
	{
		console.log(data);
		console.log(`-----------------------`);
  	});*/
  	$.ajax(
	{
		type: "POST",
		url: url,
		data: 'data=' + jsonString, 
		success: function(response)
		{
			console.log(response);
			console.log(`-----------------------`);
			alert(response);
			/*var hasJson = false; var json = '';
			try { json = $.parseJSON(response); hasJson = true; }
			catch(e) { hasJson = false; }

			if (hasJson)
			{
				alert('resonse with json: ' + response);
			}
			else
			{
				alert('resonse without json: ' + response);
			}*/
		}
	});
});



$('.edit-article-form').submit(function(e) 
{
	e.preventDefault(); 

	var form = $(this);
	var url = form.attr('action');

	
	var articleName = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=name]').val();
	var slugName = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=slug]').val();
	var tags = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=tags]').val();
	var category = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=category]').val();
	var metaKeywords = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=meta_keywords]').val();
	var metaDescription = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=meta_description]').val();
	var text = $(this).children('.l-1').children('.trumbowyg-box').children('.trumbowyg-editor').html();
	var reason = 'edit_article';
	var articleId = $(this).children('input.article_id').val();
	var previewPhoto = $(this).children('.l-1').children('.l-2').children('.l-3').children('input[name=preview_photo_input]').val();

	var jsonString = btoa(encodeURIComponent(articleName + '{divider}' + slugName + '{divider}' + tags + '{divider}' + category + '{divider}' + metaKeywords + '{divider}' + metaDescription + '{divider}' + text + '{divider}' + reason + '{divider}' + articleId + '{divider}' + previewPhoto));
  	$.ajax(
	{
		type: "POST",
		url: url,
		data: 'data=' + jsonString, 
		success: function(response)
		{
			console.log(response);
			console.log(`-----------------------`);
			alert(response);
		}
	});
});


$('.delete-article').click(function()
{
	var idArticle = $(this).parent().parent().children('input.article_id').val();
	$.get('adminblog_handler.php?reason=delete_article&target=' + idArticle, function(response)
	{
		alert('response: ' + response);
	});
});








$('.tab h1').click(function()
{
	$(this).parent().children('.content').toggle();

	if ($(this).parent().children('.content').attr('id') == 'empty')
	{
		var formPath =  $(this).parent().children('.content').children('form');
		var articleId = formPath.children('input.article_id').val();

		$.get('../adminblog_handler.php?reason=get_data&target=' + articleId, function(data)
		{
			//data = atob(data);
			//data = decodeURI(data);
			data = b64DecodeUnicode(data);

			var array = JSON.parse(data);
			console.log('id: ' + array['id']);
			console.log('datetime: ' + array['datetime']);
			console.log('name: ' + array['name']);
			console.log('slug_name: ' + array['slug_name']);
			console.log('tags: ' + array['tags']);
			console.log('category: ' + array['category']);
			console.log('meta_keywords: ' + array['meta_keywords']);
			console.log('meta_description: ' + array['meta_description']);
			console.log('text: ' + array['text']);
			console.log('preview_photo: ' + array['preview_image']);
			console.log('---------------------------');

			formPath.children('.l-1').children('.l-2').children('.l-3').children('input[name=slug]').val(array['slug_name']);
			formPath.children('.l-1').children('.l-2').children('.l-3').children('input[name=tags]').val(array['tags']);
			formPath.children('.l-1').children('.l-2').children('.l-3').children('input[name=category]').val(array['category']);
			formPath.children('.l-1').children('.l-2').children('.l-3').children('input[name=meta_keywords]').val(array['meta_keywords']);
			formPath.children('.l-1').children('.l-2').children('.l-3').children('input[name=meta_description]').val(array['meta_description']);
			formPath.children('.l-1').children('.l-2').children('.l-3').children('input[name=preview_photo_input]').val(array['preview_image']);
			formPath.children('.l-1').children('.l-2').children('.l-3').children('.preview_photo_itself').css('background-image', 'url(' + array['preview_image'] + ')');
			formPath.children('.l-1').children('.trumbowyg-box').children('.trumbowyg-editor').html(array['text']);

			$(this).parent().children('.content').attr('id', '');
	  	});	
	}	
});



$("input[name=preview_photo]").change(function() 
{
	var input = this;
	var photosAmount = input.files.length;

	var form = new FormData();
	form.append('image', this.files[0]);

	
	$.ajax(
	{
		url: "../blog/photo_uploader.php",
		method: 'POST',
		data: form,
		processData: false,
		contentType: false,
		dataType: 'text',
		success: function(response) 
		{
			var array = JSON.parse(response);
			console.log(response);
			if (array['success'] == true)
			{
				$(input).parent().children('input[name=preview_photo_input]').val(array['url']);
				$(input).parent().children('.preview_photo_itself').css('background-image', 'url(' + array['url'] + ')');
			}
			else
			{
				alert('Didn\'t return "success:true" in json.');
			}
			/*var photosNames = new Array();
			photosNames = Object.values(JSON.parse(arr));
			alert(arr);

			if (photosNames.length > 0)
			{
				for (i = 0; i < photosNames.length; i++)
				{
					$('.photo-lib .previews').append(`
						<div class="img" style="background-image: url(images/` + photosNames[i] + `);">
							<button class="action_this delete_this">Delete</button>
							<input type="hidden" value="` + photosNames[i] + `" />
						</div>
					`);
				}
			}*/
		},
		error: function(e)
		{
			alert('Something went wrong. Error: ' + JSON.stringify(e, null, 4));
		}
	});
});







function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}