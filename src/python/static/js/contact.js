// jQuery's document.ready() in shortcut form; append click function to contact button.
$(function() {
    $('#contactBtn').click(function() {
        console.log("contact-btn has been clicked!");
        sendMessage();
    })
});

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
            console.log("Response was a Success!");
        }
    });
}