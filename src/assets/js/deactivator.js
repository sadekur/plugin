jQuery(function($){

	$(document).on( 'click', '.cv-plugin-dsm-close', function(e){
		e.preventDefault()
		$('.cv-plugin-deactivation-survey-overlay').hide()
	} )

	$(document).on( 'click', '.cv-plugin-deactivation-reason', function(e){
		var par = $(this);
		if ( $( 'input', par ).prop("checked") == false ){
		 	$('label', par).removeClass('active');
		 }else{
			$('label', par).addClass('active');
		 }		 
		$('.cv-plugin-dsm-reason-details-input').slideDown();
	} )

	$(document).on( 'click', '.cv-consent-label', function(e){
		var desc = $(this).data('desc');
		alert(desc)
	} )
	

	$(document).on( 'submit', '.cv-plugin-deactivation-survey-form', function(e){
		e.preventDefault();
		var data = $(this).serializeArray()
		var parent = $(this);
		$('.cv-plugin-dsm-submit', parent).prop('disabled', true);
		 
		$.ajax({
			url: ajaxurl,
			data: data,
			type: 'POST',
			dataType: 'JSON',
			success: function(resp){				
				window.location.href='';
			}
		});
	} );
})