$('.add-tour-form').submit(function(e) 
{
	e.preventDefault(); 

	var form = $(this);
	var url = form.attr('action');

	// GENERAL PHOTOS BUILDER
	var photos_general = $(this).parent().parent().children('.content').children('form').children('.gallery-photos').children('.photo-lib-choosen').children('.previews-wrap').children('.previews').html();
	var images = '';
	$(photos_general).children('input').each(function(index, value)
	{
		images = images + $(this).val() + ';';
	});
	images = images.substring(0, images.length - 1);
	$(this).parent().parent().children('.content').children('form').children('input[name=gallery_photos]').val(images);

	// MAIN PHOTOS BUILDER
	var photos_general = $(this).parent().parent().children('.content').children('form').children('.preview-photo').children('.photo-lib-choosen').children('.previews-wrap').children('.previews').html();
	var images = '';
	$(photos_general).children('input').each(function(index, value)
	{
		images = images + $(this).val() + ';';
	});
	images = images.substring(0, images.length - 1);
	$(this).parent().parent().children('.content').children('form').children('input[name=preview_photo]').val(images);

	// DAY-BAY-DAY PROGRAM BUILDER
	var program = $(this).parent().parent().children('.content').children('form').children('.field-program2').children('.program2-frame').children('.days2');
	var dbd = [];
	$(program).children('.day2').each(function(index, value)
	{
		var bdb_destinations = $(this).children('.day-fields-2').children('.row-first').children('.col-destinations').children('.field').children('input[name=day_destinations]').val();
		var bdb_landmarks = $(this).children('.day-fields-2').children('.row-first').children('.col-landmarks').children('.field').children('input[name=day_landmarks]').val();
		var bdb_description = $(this).children('.day-fields-2').children('.field-description').children('textarea[name=day_description]').val();
		var bdb_photos = $(this).children('.day-fields-2').children('.field-photos-of-the-day').children('.photo-lib-choosen').children('.previews-wrap').children('.previews').html();
		var images = '';
		$(bdb_photos).children('input').each(function(index, value)
		{
			images = images + $(this).val() + ';';
		});
		images = images.substring(0, images.length - 1);

		dbd[index] = { 'destinations' :  bdb_destinations, 'landmarks' : bdb_landmarks, 'description' : bdb_description, 'photos_of_the_day' : images };
	});
	dbd = JSON.stringify(dbd);
	$(this).parent().parent().children('.content').children('form').children('input[name=dbd]').val(dbd);


	$.ajax(
	{
		type: "POST",
		url: url,
		data: form.serialize(),
		success: function(response)
		{
			var hasJson = false; var json = '';
			try { json = $.parseJSON(response); hasJson = true; }
			catch(e) { hasJson = false; }

			if (hasJson)
			{
				alert('resonse with json: ' + response);
			}
			else
			{
				alert('resonse without json: ' + response);
			}
		}
	});
	
});
















$('.dbd-remove-action').click(function()
{
	$(this).parent().children('.dbd-form').children('.single-d').remove(':last-child');
});

$('.dbd-add-action').click(function()
{
	$(this).parent().children('.dbd-form').append(`
			<div class="single-d">
					<div class="dbd-field dbd-field-tags">
						<label>tags of the day: </label>
						<input name="dbd_tags" />
					</div>
					<div class="dbd-field dbd-field-desc">
						<label>description of the day (with p tag): </label>
						<textarea type="text" name="dbd_desc"></textarea>
					</div>
					<div class="dbd-field dbd-field-photos">
						<label>photos of the day: </label>
						<div class="photo-lib photo-lib-choosen">
							<small>choosen:</small>
							<div class="previews sortable">
																				
							</div>
						</div>
						<div class="photo-lib">
							<small>all library:</small>
							<div class="previews">
								<?
								$images = scandir('images');
								for ($j = 0; $j < count($images); $j++)
								{
									if (($images[$j] == '.') || ($images[$j] == '..')) continue;
									echo '<div class="img" style="background-image: url(images/'.$images[$j].');">
										<a class="action_this choose_this">Choose</a>
										<input type="hidden" value="'.$images[$j].'" />
									</div>';
								}
								?>
								
							</div>
						</div>
					</div>
				</div>
		`);
	$( ".sortable" ).sortable();
});

$('.edit-tour-form').on('submit', function(e) 
{
	var form = $(this);
	var url = form.attr('action');

	// GENERAL PHOTOS BUILDER
	var photos_general = $(this).parent().parent().children('.content').children('form').children('.gallery-photos').children('.photo-lib-choosen').children('.previews-wrap').children('.previews').html();
	var images = '';
	$(photos_general).children('input').each(function(index, value)
	{
		images = images + $(this).val() + ';';
	});
	images = images.substring(0, images.length - 1);
	$(this).parent().parent().children('.content').children('form').children('input[name=gallery_photos]').val(images);

	// MAIN PHOTOS BUILDER
	var photos_general = $(this).parent().parent().children('.content').children('form').children('.preview-photo').children('.photo-lib-choosen').children('.previews-wrap').children('.previews').html();
	var images = '';
	$(photos_general).children('input').each(function(index, value)
	{
		images = images + $(this).val() + ';';
	});
	images = images.substring(0, images.length - 1);
	$(this).parent().parent().children('.content').children('form').children('input[name=preview_photo]').val(images);

	// DAY-BAY-DAY PROGRAM BUILDER
	var program = $(this).parent().parent().children('.content').children('form').children('.field-program2').children('.program2-frame').children('.days2');
	var dbd = [];
	$(program).children('.day2').each(function(index, value)
	{
		var bdb_destinations = $(this).children('.day-fields-2').children('.row-first').children('.col-destinations').children('.field').children('input[name=day_destinations]').val();
		var bdb_landmarks = $(this).children('.day-fields-2').children('.row-first').children('.col-landmarks').children('.field').children('input[name=day_landmarks]').val();
		var bdb_description = $(this).children('.day-fields-2').children('.field-description').children('textarea[name=day_description]').val();
		var bdb_photos = $(this).children('.day-fields-2').children('.field-photos-of-the-day').children('.photo-lib-choosen').children('.previews-wrap').children('.previews').html();
		var images = '';
		$(bdb_photos).children('input').each(function(index, value)
		{
			images = images + $(this).val() + ';';
		});
		images = images.substring(0, images.length - 1);

		dbd[index] = { 'destinations' :  bdb_destinations, 'landmarks' : bdb_landmarks, 'description' : bdb_description, 'photos_of_the_day' : images };
	});
	dbd = JSON.stringify(dbd);
	$(this).parent().parent().children('.content').children('form').children('input[name=dbd]').val(dbd);


	$.ajax(
	{
		type: "POST",
		url: url,
		data: form.serialize(),
		success: function(response)
		{
			var hasJson = false; var json = '';
			try { json = $.parseJSON(response); hasJson = true; }
			catch(e) { hasJson = false; }

			if (hasJson)
			{
				alert('resonse with json: ' + response);
			}
			else
			{
				alert('resonse without json: ' + response);
			}
		}
	});
	e.preventDefault(); 
});

$('.delete-tour').click(function()
{
	var idTour = $(this).parent().parent().children('input[name=id]').val();
	$.get('admin_handler.php?reason=delete_tour&id=' + idTour, function(response)
	{
		alert('response: ' + response);
	});
});




// photo uploader
$(".upload-button input[type=file]").change(function() 
{
	var input = this;
	var photosAmount = input.files.length;
	

	$.ajax(
	{
		url: "photo_uploader.php",
		method: 'POST',
		data: new FormData($('.upload-button')[0]),
		processData: false,
		contentType: false,
		dataType: 'text',
		success: function(arr) 
		{
			var photosNames = new Array();
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
			}
		},
		error: function(e)
		{
			alert('error ' + JSON.stringify(e, null, 4));
		}
	});
});

// idk what it is 
$('.upload-button input[type=file]').each(function()
{
	var $input	 = $(this),
	$label	 = $input.next('label'),
	labelVal = $label.html();

	$input.on('change', function(e)
	{
		var fileName = '';

		if (this.files && this.files.length > 1)
			fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
		else if (e.target.value)
			fileName = e.target.value.split('\\').pop();

		if (fileName)
			$label.find('span').html(fileName);
		else
			$label.html(labelVal);
	});
	// Firefox bug fix
	$input.on('focus', function()
	{ 
		$input.addClass('has-focus'); 
	}).on( 'blur', function()
	{ 
		$input.removeClass('has-focus'); 
	});
});

$(document).on("click", ".img .delete_this", function() 
{
	var element = $(this).parent();
	var filename = element.children('input').val();
	$.get('photo_remover.php?target=' + filename, function(response)
	{
		if (response == 'finished.')
		{
			element.remove();
		}
	});
});

$('.tab h1').click(function()
{
	$(this).parent().children('.content').toggle();
});

$(document).on("click", ".field-toggle label", function() 
{
	$(this).parent().children('.photo-lib').toggle();
});



$(document).on("click", ".img .clean_this", function() 
{
	var mainParentDom = $(this).parent().parent().parent();

	$(this).parent().remove();


	if (mainParentDom.children('.previews').children().length <= 0)
	{
		mainParentDom.children('.no-photos-sign').show();
	}
});


var fsChoosingLogic = '';


$(document).on("click", ".img .choose_this", function() 
{
	var photoUrl = $(this).parent().children('input').val();
	var targetBox = $(this).parent().parent().parent().parent().parent().children('.fs-target-id').val();

	var cont = `<div class="img" style="background-image: url(images/` + photoUrl + `);">
						<a class="action_this clean_this">Remove</a>
						<input type="hidden" value="` + photoUrl + `">
					</div>`;

	$(fsChoosingLogic).children('.previews').append(cont);


	$(fsChoosingLogic).children('.no-photos-sign').hide();
});


$( function() {
    $( ".sortable" ).sortable();
    $( ".sortable" ).disableSelection();
  } );














$('.fs-choosing button.close-fs-choosing').click(function()
{
	$('.fs-choosing').slideUp();
});

$(document).on("click", ".photo-lib span.fs-choose-open", function() 
{
	$('.fs-choosing').slideDown();
	//$('.fs-target-id').val($(this).parent().children('.previews-wrap'));

	var sign = $(this).parent().parent().children('label').html();
	if ($(this).parent().parent().parent().parent().children('.upper').children('.day_title').children('.day_number').html())
	{
		sign = 'Day #' + $(this).parent().parent().parent().parent().children('.upper').children('.day_title').children('.day_number').html() + ', ' + sign;
	}
	$('.id-note').html(sign);


	fsChoosingLogic = $(this).parent().children('.previews-wrap');
});










$('.add-new-day-2').click(function()
{
	$(this).parent().parent().children('.days2').append(`
		<div class="day2">
			<div class="upper">
				<span class="day_title">Day #<span class="day_number"></span></span>
				<span class="remove_day_2">Remove day</span>
			</div>
			<div class="day-fields-2">
				<div class="row row-first">
					<div class="col-6 col-destinations">
						<div class="field">
							<label>Destinations (semicolon separated):</label>
							<input type="text" name="day_destinations" />
						</div>
					</div>
					<div class="col-6 col-landmarks">
						<div class="field">
							<label>Landmarks (semicolon separated):</label>
							<input type="text" name="day_landmarks" />
						</div>
					</div>
				</div>
				<div class="field field-description">
					<label>Description (with P tag):</label>
					<textarea rows="6" type="text" name="day_description"></textarea>
				</div>
				<div class="field field-photos-of-the-day">
					<label>Photos of the day:</label>
					<div class="photo-lib photo-lib-choosen">
						<span class="fs-choose-open" id="photos-of-the-day-1">Choose</span>
						<div class="previews-wrap">
							<span class="no-photos-sign">No photos.</span>
							<div class="previews sortable photos-genereal-previews"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`);

	recalcDays2($(this).parent().parent().children('.days2'));
});


$(document).on("click", ".remove_day_2", function() 
{
	var parent = $(this).parent().parent().parent();
	$(this).parent().parent().remove();

	recalcDays2(parent);
});


function recalcDays2(object)
{
	var numberOfDays = object.children().length;

	object.children().each(function(index) 
	{
		$(this).children('.upper').children('.day_title').children('.day_number').html(index + 1);
	});
}