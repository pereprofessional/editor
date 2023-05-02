var gCurrentPhoto = 0;
var gTotalPhotos = 0;
var gPhotoList = ''; // given comma separated then parse it in array in init


$(document).ready(function()
{
	initGallery();
});

$('.img-ar-next').click(function()
{
	nextPhoto();
});

$('.img-ar-prev').click(function()
{
	prevPhoto();
});

$('.img_prevew').click(function()
{
	gCurrentPhoto = $(this).children('input').val();
	setPhoto();
});

$('.img_main').click(function()
{
	initFullscreen();
});

$('.img-fs-close').click(function()
{
	killFullscreen();
});

$('.img-fs-ar-next').click(function()
{
	nextPhoto('full');
});

$('.img-fs-ar-prev').click(function()
{
	prevPhoto('full');
});

// next main gallery photo
// prev main gallery photo

// open fullscreen

// next fullscreen gallery photo
// prev fullscreen gallery photo

// close fullscreen



/*$(document).on("dblclick", ".fsg-photo img", function(e) 
{
	$('.fsg-photo img').css('width', 'auto');
	$('.fsg-photo img').css('height', 'auto');
});*/


function initGallery()
{
	if ($('.gl-gal-wrap').length)
	{
		gPhotoList = $('.gl-gal-wrap .g_photo_list').val().split(';'); // array
		gTotalPhotos = gPhotoList.length;
	}
}

function nextPhoto(interface) // interface — if full so chage main and fullscreen photos otherwise just main
{
	if (gCurrentPhoto == gTotalPhotos - 1)
	{
		gCurrentPhoto = 0;
	}
	else
	{
		gCurrentPhoto++;
	}

	setPhoto();

	if (interface == 'full')
	{
		mainPhotoToFsPhoto();
	}
}

function prevPhoto(interface) // interface — if full so chage main and fullscreen photos otherwise just main
{
	if (gCurrentPhoto == 0)
	{
		gCurrentPhoto = gTotalPhotos - 1;
	}
	else
	{
		gCurrentPhoto--;
	}

	setPhoto();

	if (interface == 'full')
	{
		mainPhotoToFsPhoto();
	}
}

function setPhoto(id) // id — number of clicked photo
{
	$('.img_prevew').removeClass('active');
	$('.img_prevew-' + gCurrentPhoto).addClass('active');

	$('.img_main').css('background-image', $('.img_prevew-' + gCurrentPhoto).css('background-image'));
	$('.img_main').attr('id', 'img_prevew-' + gCurrentPhoto);


}

function initFullscreen()
{
	$('.fs-gallery').fadeIn(250);
	$('body').css('overflow', 'hidden');

	$('.fsg-header span.total-photos').html(gTotalPhotos);

	mainPhotoToFsPhoto();
}

function killFullscreen()
{
	$('.fs-gallery').fadeOut(250);
	$('body').css('overflow', 'auto');

	$('.fsg-photo').html('');
}

function mainPhotoToFsPhoto()
{
	var photoPath = $('.img_main').css('background-image');
	photoPath = photoPath.slice(5, $('.img_main').css('background-image').length - 2);

	$('.fsg-header span.current-photos').html(parseInt(gCurrentPhoto) + 1);

	$('.fsg-photo').html('<img src="' + photoPath + '" />');

	var heightFrame = $('.fsg-photo').height();
	var heightPhoto = $('.fsg-photo img').height();
	var widthFrame = $('.fsg-photo').width();
	var widthPhoto = $('.fsg-photo img').width();


	
	if ((heightPhoto <= heightFrame) && (widthPhoto <= widthFrame))
	{
		$('.fsg-photo img').css('width', 'auto');
		$('.fsg-photo img').css('height', 'auto');
		//console.log(1);
	}
	else if ((heightPhoto <= heightFrame) && (widthPhoto > widthFrame))
	{
		$('.fsg-photo img').css('width', '100%');
		$('.fsg-photo img').css('height', 'auto');
		//console.log(2);
	}
	else if ((heightPhoto > heightFrame) && (widthPhoto <= widthFrame))
	{
		$('.fsg-photo img').css('width', 'auto');
		$('.fsg-photo img').css('height', '100%');
		//console.log(4);
	}
	else if ((heightPhoto > heightFrame) && (widthPhoto > widthFrame))
	{
		if (heightPhoto < widthPhoto)
		{
			if (heightFrame < widthFrame)
			{
				$('.fsg-photo img').css('width', 'auto');
				$('.fsg-photo img').css('height', '100%');
				//console.log(5);
			}
			else if (heightFrame >= widthFrame)
			{
				$('.fsg-photo img').css('width', '100%');
				$('.fsg-photo img').css('height', 'auto');
				//console.log(6);
			}
		}
		else if (heightPhoto >= widthPhoto)
		{
			if (heightFrame < widthFrame)
			{
				$('.fsg-photo img').css('width', 'auto');
				$('.fsg-photo img').css('height', '100%');
				//console.log(7);
			}
			else if (heightFrame >= widthFrame)
			{
				$('.fsg-photo img').css('width', '100%');
				$('.fsg-photo img').css('height', 'auto');
				//console.log(8);
			}
		}
	}
}