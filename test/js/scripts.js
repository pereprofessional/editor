$('.fake-scroll-target').css('top', -$('header').outerHeight());
$('.smooth-scroll').on('click', function(event) 
{
	var target = $(this).attr('href');


	if (target.charAt(0) == '/') target = target.slice(1);

	//alert(target);
	//alert($(target).offset().top);

	if ($(target).length) 
	{
		event.preventDefault();
		$('html, body').stop().animate(
		{
    		scrollTop: $(target).offset().top
		}, 1000);
	}
});






/*
$('.img-ar-next').click(function()
{
	var currentImageId = $('.img_main').children('input').val(); // get current image id
	var numberOfImages = $(".previews .img_prevew").length; // get number of images

	// if it's the last image go to the first
	if (numberOfImages == parseInt(currentImageId) + 1) var nextImageId = 0;
	else var nextImageId = parseInt(currentImageId) + 1; // otherwise just calc current + 1
	
	// get image url from next image
	var nextImageContent = $('.img_prevew-' + nextImageId).css('background-image');
	$('.img_main').css('background-image', nextImageContent); // set next image to current

	$('.img_main').attr('id', 'img_prevew-' + nextImageId); // change useless image id
	$('.img_main').children('input').val(nextImageId); // change id in used input

	// clean active condition from current image
	$('.img_prevew-' + currentImageId).removeClass('active'); 
	// set active next preview image
	$('.img_prevew-' + nextImageId).addClass('active');
});

$('.img-ar-prev').click(function()
{
	var currentImageId = $('.img_main').children('input').val(); // get current image id
	var numberOfImages = $(".previews .img_prevew").length; // get number of images

	// if it's the first image go to the last
	if (0 == parseInt(currentImageId)) var prevImageId = numberOfImages - 1;
	else var prevImageId = parseInt(currentImageId) - 1; // otherwise just calc current + 1
	
	// get image url from prev image
	var prevImageContent = $('.img_prevew-' + prevImageId).css('background-image');
	$('.img_main').css('background-image', prevImageContent); // set prev image to current

	$('.img_main').attr('id', 'img_prevew-' + prevImageId); // change useless image id
	$('.img_main').children('input').val(prevImageId); // change id in used input

	// clean active condition from current image
	$('.img_prevew-' + currentImageId).removeClass('active'); 
	// set active prev preview image
	$('.img_prevew-' + prevImageId).addClass('active');
});

$('.img_prevew').click(function()
{
	var currentImageId = $(this).children('input').val();
	$('.img_prevew').removeClass('active');
	$('.img_prevew-' + currentImageId).addClass('active');

	var currentImageContent = $('.img_prevew-' + currentImageId).css('background-image');
	$('.img_main').css('background-image', currentImageContent);

	$('.img_main').attr('id', 'img_prevew-' + currentImageId); // change useless image id
	$('.img_main').children('input').val(currentImageId); // change id in used input
});*/










$('.calc_action').click(function()
{
	$('.calculator .error').hide();

	var basePrice = $('input[name=base_price]').val();
	var humans = $(this).parent().children('.f-humans').children('input').val();

	if (humans > 0)
	{
		var condition_transfer = $('.calculator input[name=f-transfer]:checked').length;
		var condition_accomodation = $('.calculator input[name=f-accomodation]:checked').length;
		var condition_food = $('.calculator input[name=f-food]:checked').length;
		if ((condition_transfer == 0) || (condition_accomodation == 0) || (condition_food == 0))
		{
			$('.calculator .error span').html('Вы заполнили не все пункты.');
		$('.calculator .error').fadeIn(250);
		}
		else
		{
			var transfer = $('.calculator input[name=f-transfer]:checked').attr('id').substring(2); 
			var accomodation = $('.calculator input[name=f-accomodation]:checked').attr('id').substring(2);
			var food = $('.calculator input[name=f-food]:checked').attr('id').substring(2);

			var finalPrice = 0;

			if (humans == 5) basePrice = parseInt(basePrice, 10) * 1.1;
			if (humans == 6) basePrice = parseInt(basePrice, 10) * 1.25;
			if (humans == 7) basePrice = parseInt(basePrice, 10) * 1.35;
			if (humans >= 8) basePrice = parseInt(basePrice, 10) * 1.5;

			finalPrice = parseInt(basePrice, 10);
			finalPrice = finalPrice + parseInt(transfer, 10);
			finalPrice = finalPrice + parseInt(accomodation, 10) * humans;
			finalPrice = finalPrice + parseInt(food, 10) * humans;

			$('.calculator .result .res-total span').html(number_format(parseInt(finalPrice, 10), 0, ',', ' ') + ' руб.');
			$('.calculator .result .res-person span').html(number_format(Math.ceil(finalPrice / humans), 0, ',', ' ') + ' руб.');

			$('.calculator .result').fadeIn(250);
		}
	}
	else
	{
		$('.calculator .result').hide();
		$('.calculator .error span').html('Вы не указали количество человек.');
		$('.calculator .error').fadeIn(250);
	}
	

	
});






$(".phone_mask").mask("+7 (999) 999-99-99");





function number_format(number, decimals, dec_point, separator ) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof separator === 'undefined') ? ',' : separator ,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k)
        .toFixed(prec);
    };
  // Фиксим баг в IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
    .split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '')
    .length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1)
      .join('0');
  }
  return s.join(dec);
}








/////////////////////////////////////////////////////////////////////////////////////////////






$(document).on('submit', '#bookingForm', function(e)
{
	e.preventDefault();

	$(this).children('span.error').hide();
	$(this).children('.row').children('.col-f').children('input[name=phone]').removeClass('wrong_field');

	if (!$(this).children('.row').children('.col-f').children('input[name=phone]').val())
	{
		$(this).children('span.error').fadeIn(250);
		$(this).children('.row').children('.col-f').children('input[name=phone]').addClass('wrong_field');
		return;
	}
	
	var name = $(this).children('.row').children('.col-f').children('input[name=name]').val();
	var phone = $(this).children('.row').children('.col-f').children('input[name=phone]').val();
	var method = $(this).children('.row').children('.col-f').children('select[name=method]').val();
	var message = $(this).children('textarea[name=message]').val();

	var jsonString = btoa(encodeURIComponent(name + '{divider}' + phone + '{divider}' + method + '{divider}' + message));

	$.get('../sender.php?data=' + jsonString, function(data)
	{
		console.log(data);
		if (data == 'success')
		{
			$('.booking_frame .sent-note').fadeIn(250).css('display', 'flex');
			ym(69867895,'reachGoal','contact-phone-or-feedback-request');
			return gtag_report_conversion('tel:+79041416444');
		}
  	});

});

$("input[name=phone]").click(function()
{
	$(this).parent().parent().parent().children('span.error').hide();
	$(this).removeClass('wrong_field');
});




$(".carousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 5 ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -5 ){
            $(this).carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});