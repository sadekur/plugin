jQuery(function ($) {
    console.log('fields JS loaded');
    if ($(".cv-color-picker").length > 0) $(".cv-color-picker").wpColorPicker();
    if ($(".cv-select2").length > 0) $(".cv-select2").select2({ width: "100%" });
    if ($(".cv-chosen").length > 0) $(".cv-chosen").chosen({ width: "100%" });
    if (localStorage.getItem("active_cv_tab") == "undefined" || localStorage.getItem("active_cv_tab") == null || $(localStorage.getItem("active_cv_tab")).length <= 0) {
        localStorage.setItem("active_cv_tab", $(".cv-nav-tab:first-child a").attr("href"));
    }
    if (typeof localStorage != "undefined") {
        active_cv_tab = localStorage.getItem("active_cv_tab");
    }
    if (window.location.hash) {
        active_cv_tab = window.location.hash;
        if (typeof localStorage != "undefined") {
            localStorage.setItem("active_cv_tab", active_cv_tab);
        }
    }
    $(".cv-section").hide();
    $(".cv-nav-tab").removeClass("cv-active-tab");
    $('[href="' + localStorage.getItem("active_cv_tab") + '"]')
        .parent()
        .addClass("cv-active-tab");
    $(localStorage.getItem("active_cv_tab")).show();
    $(".cv-nav-tab").click(function (e) {
        e.preventDefault();
        $(".cv-section").hide();
        $(".cv-nav-tab").css("background", "inherit").removeClass("cv-active-tab");
        $(this).addClass("cv-active-tab").css("background", $(this).data("color"));
        $(".cv-nav-tab a").removeClass("cv-active-tab");
        $(".cv-nav-tab a").each(function (e) {
            $(this).css("color", $(this).parent().data("color"));
        });
        $("a", this).css("color", "#fff");
        var target = $("a", this).attr("href");
        $(target).show();
        localStorage.setItem("active_cv_tab", target);
    });
    $(".cv-form").submit(function (e) {
        e.preventDefault();
        if (typeof tinyMCE != "undefined") tinyMCE.triggerSave();
        var $form = $(this);
        var $submit = $(".cv-submit", $form);
        var $overlay = $('#cv-overlay');
        $submit.attr("disabled", !0);
        $(".cv-message", $form).hide();
        $overlay.show();
        $.ajax({
            url: ajaxurl,
            data: $form.serialize(),
            type: "POST",
            dataType: "JSON",
            success: function (ret) {
                if (ret.status == 1 || ret.status == 0) {
                    $(".cv-message p", $form).text(ret.message);
                    $(".cv-message", $form).show().fadeOut(3000);
                }
                $submit.attr("disabled", !1);
                if (ret.page_load == 1)
                    setTimeout(function () {
                        window.location.href = "";
                    }, 1000);
                $overlay.hide();
            },
            erorr: function (ret) {
                $submit.attr("disabled", !1);
                $overlay.hide();
            },
        });
    });
    $(".cv-reset-button").click(function (e) {
        var $this = $(this);
        var $option_name = $this.data("option_name");
        var $_nonce = $this.data("_nonce");
        $this.attr("disabled", !0);
        $("#cv-message-" + $option_name).hide();
        var $overlay = $('#cv-overlay');
        $overlay.show();
        $.ajax({
            url: ajaxurl,
            data: { action: "cv-reset", option_name: $option_name, _wpnonce: $_nonce },
            type: "POST",
            dataType: "JSON",
            success: function (ret) {
                $("#cv-message-" + $option_name + ' p').text(ret.message);
                $("#cv-message-" + $option_name).show();
                $overlay.hide();
                setTimeout(function () {
                    window.location.href = "";
                }, 1000);
            },
            erorr: function (ret) {
                $this.attr("disabled", !1);
                $overlay.hide();
            },
        });
    });
    $(".cv-browse").on("click", function (event) {
        event.preventDefault();
        var self = $(this);
        var parent = $(this).parent()
        var file_frame = (wp.media.frames.file_frame = wp.media({ title: self.data("title"), button: { text: self.data("select-text") }, multiple: !1 }));
        file_frame.on("select", function () {
            attachment = file_frame.state().get("selection").first().toJSON();
            $(".cv-file", parent).val(attachment.url);
            $(".supports-drag-drop").hide();
        });
        file_frame.open();
    });
    $("#cv-submit-top").click(function (e) {
        $(".cv-message").hide();
        $(".cv-form:visible").submit();
    });
    $("#cv-reset-top").click(function (e) {
        $(".cv-form:visible .cv-reset-button").click();
    });
    $('a[href="' + localStorage.active_cv_tab + '"]').click();

    $('.cv-tab').click(function(e){
        var target = $(this).data('target')
        var par = $(this).closest('.cv-field-wrap')
        $('.cv-tab-content',par).hide()
        $('.cv-tab',par).removeClass('cv-tab-active')
        $(this).addClass('cv-tab-active')
        $('#'+target).show()
    })

    $(document).on('click', '.cv-repeater-add', function(e){
        $(this).parent().before($(this).parent().clone()).find('input,select,textarea').val('')
    })

    $(document).on('click', '.cv-repeater-remove', function(e){
        if($('.cv-repeatable').length <= 1 ) return;
        $(this).closest('.cv-repeatable').remove()
    })
});