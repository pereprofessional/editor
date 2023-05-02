var videoCondition = 0;
var photoCondition = 0;
var videoObject = '';

var currentStoryHeight = 0;
var currentStoryWidth = 0;
var currentStoryType = '';


var w = $(window).width();
var h = $(window).height();
var r = h / w;

var storyPhotoDuration = 5;
var currentStoryTimePosition = 0;
var storyTimer;


if (w >= 576)
{
	$('.fss-footage').on('click', function(event) 
	{
		if (currentStoryType == 'video')
		{
			videoObject = document.getElementById("story");
			if (videoCondition == 0)
			{
				videoObject.pause();
				videoCondition = 1;
			}
			else if (videoCondition == 1)
			{
				videoObject.play();
				videoCondition = 0;
			}
		}
		if (currentStoryType == 'photo')
		{
			if (photoCondition == 0)
			{
				photoCondition = 1;
			}
			else if (photoCondition == 1)
			{
				photoCondition = 0;
			}
		}
		
	});
}
else
{
	$('.fss-footage').on('tap', function() 
	{
		nextStory();
	});
	
	
	$('.fss-footage').on('touchstart', function() 
	{
		if (currentStoryType == 'video')
		{
			videoObject = document.getElementById("story");
			videoObject.pause();
			videoCondition = 1;
		}
		if (currentStoryType == 'photo')
		{
			photoCondition = 1;
		}
	});
	$('.fss-footage').on('touchend', function() 
	{
		if (currentStoryType == 'video')
		{
			videoObject = document.getElementById("story");
			videoObject.play();
			videoCondition = 0;
		}
		if (currentStoryType == 'photo')
		{
			photoCondition = 0;
		}
	});
	
			
}

$( ".fss-footage" ).contextmenu(function() 
{
  return false;
});


$('.open_fss').click(function()
{
	var stoId = $(this).attr('id');
	initStories(stoId);

	$('.fs-stories').fadeIn(250);
	fssSetWindowSize();
	$('body').css('overflow', 'hidden');
});

$('.close_fss').click(function()
{
	closeStoryWindow();
	killStories();
});

function closeStoryWindow()
{
	$('.fs-stories').fadeOut(250);
	$('body').css('overflow', 'auto');
}

$('.fss-next').click(function()
{
	nextStory();
});

$('.fss-prev').click(function()
{
	prevStory();
});

$(window).resize(function() 
{
	fssSetWindowSize();
});

function fssSetWindowSize()
{

	var fssHeight = $('.fs-stories .fss-wrap .fss-body').height();
	if (r < 1.78)
	{
		$('.fs-stories .fss-wrap .fss-container').width(fssHeight / 1.78);
	}
	else
	{
		$('.fs-stories .fss-wrap .fss-container').width(fssHeight / r);
	}

	
}

var currentStory = 0;
var totalStories = 0;
var photoList = '';

function initStories(stoId)
{
	videoCondition = 0;


	storyTimer = setInterval(function tick() { timerTick() }, frameRate);


	photoList = $('#' + stoId + '.preview.open_fss').children('.sto-photo-list').val().split(','); // array
	currentStory = 0;
	totalStories = photoList.length; // amount of stories in this cat


	var numberLines = '';
	for (var r = 0; r < totalStories; r++)
	{
		numberLines = numberLines + '<span class="line" id="line-' + r + '"></span>';
	}
	$('.fs-stories .fss-header .lines').html(numberLines);
	

	var previewImage = $('#' + stoId + '.preview.open_fss').children('.photo-warp').children('.photo').css('background-image');
	$('.fs-stories .fss-header .preview-photo').css('background-image', previewImage);
	$('.fss-header .upper span').html($('#' + stoId + '.preview.open_fss').children('span.text').html());


	setFootage(currentStory); // show first footage
}

function killStories()
{
	$('.fss-footage').html(``);
	currentStory = 0;
	totalStories = 0;
	photoList = '';
	currentStoryHeight = 0;
	currentStoryWidth = 0;
	currentStoryType = '';
	clearInterval(storyTimer);
	currentStoryTimePosition = 0;
}

function setActiveLines()
{
	$('.fs-stories .fss-header span.line').html('');
	$('.fs-stories .fss-header span.line').removeClass('active');

	for (var r = 0; r < totalStories; r++)
	{
		if (r < currentStory)
		{
			$('.fs-stories .fss-header span#line-' + r + '.line').addClass('active');
		}
		else if (r > currentStory)
		{
			//$('.fs-stories .fss-header span#line-' + r + '.line').removeClass('active');
		}
		else
		{
			(r == currentStory)
			{
				$('.fs-stories .fss-header span#line-' + r + '.line').append('<span class="line-insider"></span>');
			}
		}
	}
	
}

function setFootage()
{
	setActiveLines();


	var footageType = photoList[currentStory].substr(photoList[currentStory].length - 3);

	if (footageType == 'mp4')
	{
		$('.fss-footage').html(`
			<div class="fss-video">
				<video id="story" autoplay playsinline>
					<source src="` + photoList[currentStory] + `" type="video/mp4">
				</video>
			</div>
			<div class="fss-loading"></div>
		`);

		// вытягиваем размет видика
	    /*$('#story').bind('loadedmetadata', function() 
		{
		    currentStoryWidth = $(this).prop('videoWidth'); 
	    	currentStoryHeight = $(this).prop('videoHeight'); 
	    	currentStoryType = 'video';
	    	$('.fs-stories .fss-header .upper span').html(currentStoryWidth + ' x ' + currentStoryHeight + ' | ' + currentStoryType);
		 });*/
		 currentStoryType = 'video';

		trackIfVideoEnds();

		storyTimer = setInterval(function tick() { timerTick() }, frameRate);
	}
	else
	{
		$('.fss-footage').html(`
			<div class="fss-photo" style="background-image: url(` + photoList[currentStory] + `);"></div>
			<div class="fss-loading"></div>
		`);

		// вытягиваем размер (не дописано)
		/*currentStoryWidth = 0; 
	    currentStoryHeight = 0;
	    currentStoryType = 'photo';
	    $('.fs-stories .fss-header .upper span').html(currentStoryWidth + ' x ' + currentStoryHeight + ' | ' + currentStoryType);*/
	    currentStoryType = 'photo';

	    storyTimer = setInterval(function tick() { timerTick() }, frameRate);
	}
}


var footageTimePercent = 0;
var maxPhotoDuration = storyPhotoDuration * 100;
var maxVideoDuration = 0;
var currentVideoTimePosition = 0;
var frameRate = 15;

function timerTick()
{
	if (currentStoryType == 'photo')
	{
		if (photoCondition == 0) currentStoryTimePosition = currentStoryTimePosition + 1;
		
		if (currentStoryTimePosition > maxPhotoDuration)
		{
			nextStory();
		}

		footageTimePercent = currentStoryTimePosition / (maxPhotoDuration / 100);

		$('.fs-stories .fss-header span#line-' + currentStory + '.line .line-insider').css('width', footageTimePercent + '%');
	}
	if (currentStoryType == 'video')
	{
		currentVideoTimePosition = $('#story')[0].currentTime;
		maxVideoDuration = $('#story')[0].duration;

		footageTimePercent = currentVideoTimePosition / (maxVideoDuration / 100);

		$('.fs-stories .fss-header span#line-' + currentStory + '.line .line-insider').css('width', footageTimePercent + '%');
	}
}
		
	
	


function trackIfVideoEnds()
{
	var vid = document.getElementById("story");
	vid.onended = function() 
	{
    	nextStory();
	}
}


function nextStory()
{
	if (currentStory == totalStories - 1)
	{
		closeStoryWindow();
		killStories();
	}
	else
	{
		currentStory++;
		setFootage();
	}
	clearInterval(storyTimer);
	currentStoryTimePosition = 0;
}

function prevStory()
{
	if (currentStory == 0)
	{
		closeStoryWindow();
		killStories();
	}
	else
	{
		currentStory--;
		setFootage();
	}
	clearInterval(storyTimer);
	currentStoryTimePosition = 0;
}











