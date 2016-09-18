$(function() {
    $('#contactBtn').click(function() {
        if (validateInput()) {
            $('#reCAPTCHAModal').modal();
            // sendMessage();
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
    });
}

function respondSuccess() {
    $('#contactMessage').val('');
    $('#alertSuccess').show();
}

function respondError() {
    $('#alertError').show();
}