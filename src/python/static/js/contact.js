$(function() {
    $('#contactBtn').click(function() {
        if (validateInput()) {
            $('#reCAPTCHAModal').modal();
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
    var inputName = $('#contactName').val();

    if (typeof inputName != 'undefined') {
        if (inputName.length == 0) {
            $('#contactName').val('Anonymous');
        }
    }

    var inputEmail = $('#contactEmail').val();

    if (typeof inputEmail != 'undefined') {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (inputEmail.replace(/\s/g).length == 0 || !regex.test(inputEmail)) {
            $('#contactEmail').popover('show');
            return false;
        }
    }
    return true;
}

function verifyRecaptcha(recatcha_resp) {

    return $.ajax({
        url: "https://www.google.com/recaptcha/api/siteverify",
        type: "POST",
        dataType: 'json',
        data: {
            secret: "6LfX8gYUAAAAAKPAg31OIPsTqtQQAdNtJKVPsrpS",
            response: recatcha_resp
        }
    })
    .done(function() {
        sendMessage();
    })
    .fail(function() {
        var errMsg = "Sorry; the request to verify your reCAPTCHA has failed!";
        respondError(errMsg);
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
        },
        success: function(response) {
            respondSuccess();
        },
        error: function(response) {
            respondError();
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
    $('#alertError').val(errMsg).show();
}