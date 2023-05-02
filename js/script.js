

$('.texter').trumbowyg({
	btns: [
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
	plugins: {
		upload: {
			serverPath: '/editor/photo_uploader.php',
			fileFieldName: 'image',
			success: function(data, trumbowyg, _$modal, values)
			{
				trumbowyg.doc.execCommand("insertHTML", false, "<img src='/editor/" + data.url + "' alt='" +  values.alt + "'>")
				trumbowyg.closeModal();
			}
		},
	}
});

const ARTICLE_NAME_MIN_LENGTH = 6;
const ARTICLE_NAME_MIN_LENGTH_ERROR_TEXT = 'Название статьи должно быть не короче ' + ARTICLE_NAME_MIN_LENGTH +' символов';

const ARTICLE_NAME_MAX_LENGTH = 64;
const ARTICLE_NAME_MAX_LENGTH_ERROR_TEXT = 'Название статьи не должно превышать ' + ARTICLE_NAME_MAX_LENGTH + ' символа';

const ARTICLE_TEXT_MIN_LENGTH = 100;
const ARTICLE_TEXT_MIN_LENGTH_ERROR_TEXT = 'Статья слишком короткая';


$(document).ready(function() {


	if ($('.editor-add-article').length) {
		$('.trumbowyg-editor').html($('.article-text').val());
	}

	$('.add-article').click(function() {

		$('.error-alert').html('');

		if ($('.article-name').val().length < ARTICLE_NAME_MIN_LENGTH) {
			$('.error-alert').html(ARTICLE_NAME_MIN_LENGTH_ERROR_TEXT);
			return;
		}

		if ($('.article-name').val().length > ARTICLE_NAME_MAX_LENGTH) {
			$('.error-alert').html(ARTICLE_NAME_MAX_LENGTH_ERROR_TEXT);
			return;
		}
		if ($('.trumbowyg-textarea').val().length < ARTICLE_TEXT_MIN_LENGTH) {
			$('.error-alert').html(ARTICLE_TEXT_MIN_LENGTH_ERROR_TEXT);
			return;
		}

		var form_data = {
			target: 'add-article',
			article_name: $('.article-name').val(),
			article_text: $('.trumbowyg-textarea').val()
		};

		$.ajax({
			type: "POST",
			url: "article",
			data: form_data,
			dataType: "json",
			encode: true,
		}).done(function (data) {
			console.log(data);
			if (data['status'] == 'success') {
				document.cookie = "token="+data['token']+";";
				document.cookie = "draft_name=;";
				document.cookie = "draft_text=;";
				window.location.replace('article/' + data['slug']);
				/*$('.editor-add-article').hide();
				$('.article-new-link a').attr('href', 'article/' + data['slug']);
				$('.article-new-link a').html(data['slug']);
				$('.editor-finished-article').show();*/
			} else if (data['status'] == 'fail') {
				if (data['message'] == 'article_name_short') {
					$('.error-alert').html(ARTICLE_NAME_MIN_LENGTH_ERROR_TEXT);
				} else if (data['message'] == 'article_name_long') {
					$('.error-alert').html(ARTICLE_NAME_MAX_LENGTH_ERROR_TEXT);
				} else if (data['message'] == 'article_text_short') {
					$('.error-alert').html(ARTICLE_TEXT_MIN_LENGTH_ERROR_TEXT);
				}
			}
		});
	});


	if ($('.editor-edit-article').length) {
		$('.trumbowyg-editor').html($('.article-text').val());
	}

	$('.edit-article').click(function() {

		$('.error-alert').html('');

		if ($('.article-name').val().length < ARTICLE_NAME_MIN_LENGTH) {
			$('.error-alert').html(ARTICLE_NAME_MIN_LENGTH_ERROR_TEXT);
			return;
		}

		if ($('.article-name').val().length > ARTICLE_NAME_MAX_LENGTH) {
			$('.error-alert').html(ARTICLE_NAME_MAX_LENGTH_ERROR_TEXT);
			return;
		}
		if ($('.trumbowyg-editor').html().length < ARTICLE_TEXT_MIN_LENGTH) {
			$('.error-alert').html(ARTICLE_TEXT_MIN_LENGTH_ERROR_TEXT);
			return;
		}


		var form_data = {
			target: 'edit-article-request',
			article_name: $('.article-name').val(),
			article_text: $('.trumbowyg-editor').html(),
			article_slug: $('.article-slug').val()
		};

		$.ajax({
			type: "POST",
			url: "article",
			data: form_data,
			dataType: "json",
			encode: true,
		}).done(function (data) {
			//console.log(data);
			if (data['status'] == 'success') {
				//document.cookie = "token="+data['token']+";";
				window.location.replace('/editor/article/' + data['slug']);
				/*$('.editor-add-article').hide();
				$('.article-new-link a').attr('href', 'article/' + data['slug']);
				$('.article-new-link a').html(data['slug']);
				$('.editor-finished-article').show();*/
			} else if (data['status'] == 'fail') {
				if (data['message'] == 'article_does_not_exist') {
					$('.error-alert').html('Статья не существует');
				} else if (data['message'] == 'can_not_edit_article') {
					$('.error-alert').html('Истекло время редактирования или не вы создали эту статью');
				}
			}
		});
	});

	$('.article-name').keyup(function() {
		saveEdits();
	});

	$('.trumbowyg-box').keyup(function() {
		saveEdits();
	});

	$('.trumbowyg-box').click(function() {
		saveEdits();
	});


	function saveEdits() {
		//console.log($('.article-name').val(), $('.trumbowyg-textarea').val());
		document.cookie = "draft_name="+$('.article-name').val()+";";
		document.cookie = "draft_text="+$('.trumbowyg-textarea').val()+";";
	}

});