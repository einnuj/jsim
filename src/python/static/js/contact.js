$(function() {
    $('#contactBtn').click(function() {
        if (validateInput()) {
            $('#reCAPTCHAModal').modal('show');
        }
    });
    $('#closeSuccessBtn').click(function() {
        $('#alertSuccess').hide();
    });
    $('#closeErrorBtn').click(function() {
        $('#alertError').hide();
    });
    $('#contactEmail').on('show.bs.popover', function() {
        setTimeout(function() {
            $('#contactEmail').popover('hide');
        }, 3000);
    })
});

function validateInput() {
    var inputNameSelect = $('#contactName');
    var inputName = inputNameSelect.val();

    if (typeof inputName != 'undefined') {
        if (inputName.length == 0) {
            inputNameSelect.val('Anonymous');
        }
    }

    var inputEmailSelect = $('#contactEmail');
    var inputEmail = inputEmailSelect.val();

    if (typeof inputEmail != 'undefined') {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (inputEmail.replace(/\s/g).length == 0 || !regex.test(inputEmail)) {
            inputEmailSelect.popover('show');
            return false;
        }
    }
    return true;
}

function verifyRecaptcha(recaptcha_resp) {
    var modalFooterSelect = $('.modal-footer');
    var modalFooterOrgMsg = modalFooterSelect.html();

    return $.ajax({
        url: $SCRIPT_ROOT + "/recaptcha",
        type: "POST",
        dataType: 'json',
        data: {
            response: recaptcha_resp
        }
    })
    .done(function() {
        modalFooterSelect.html("You are (probably) not a robot; sending the message now! You can close this box, or wait for it to close itself in 3 seconds.");
        sendMessage();
    })
    .fail(function() {
        var errMsg = "Sorry; the request to verify your reCAPTCHA has failed!";
        respondError(errMsg);
    })
    .always(function() {
        setTimeout(function() {
            $('#reCAPTCHAModal').modal('hide');
            grecaptcha.reset();
            modalFooterSelect.html(modalFooterOrgMsg);
        }, 3000);
    });
}

function sendMessage() {
    $.ajax({
        url: $SCRIPT_ROOT + "/contactme",
        type: "POST",
        data: {
            name: $('#contactName').val(),
            email: $('#contactEmail').val(),
            business: $('#businessCheckbox').is('checked'),
            message: $('#contactMessage').val()
        }
    })
    .done(function() {
        respondSuccess();
    })
    .fail(function() {
        var errMsg = "There was a server error; Junnie has been notified. Sorry!";
        respondError(errMsg);
    });
}

function respondSuccess() {
    $('#contactMessage').val('');
    $('#alertSuccess').show();
}

function respondError(errMsg) {
    $('#alertError').html(errMsg).show();
}