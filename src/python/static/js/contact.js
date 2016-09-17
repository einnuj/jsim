$(function() {
    $('#contactBtn').click(function() {
        if (validateForm()) {
            sendMessage();
        }
    });
    $('#closeSuccessBtn').click(function() {
        $('#alertSuccess').hide();
    });
    $('#closeErrorBtn').click(function() {
        $('#alertError').hide();
    });
});

function validateForm() {

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