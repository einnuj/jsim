// jQuery's document.ready() in shortcut form; append click function to contact button.
$(function() {
    $('#contactBtn').click(function() {
        console.log("contact-btn has been clicked!");
        var msg = {
            name: $('#contactName').val(),
            email: $('#contactEmail').val(),
            business: $('#businessCheckbox').is('checked')
        };
        console.log(msg);
    })
})