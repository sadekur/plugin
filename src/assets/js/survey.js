jQuery(function($){
    $(document).on('click', '.cv-survey .notice-dismiss, .cv-survey .cv-survey-btn', function(e){
        $(this).prop('disabled', true);
        var $slug = $(this).closest('.cv-survey').data('slug')
        $.ajax({
            url: ajaxurl,
            data: { 'action' : $slug + '_survey', 'participate' : $(this).data('participate') },
            type: 'POST',
            success: function(ret) {
                $('#'+$slug+'-survey-notice').slideToggle(500)
            }
        })
    })
})