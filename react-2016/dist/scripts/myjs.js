$(document).ready( function() {
        if (!token) {
            $("#add-img-button").addClass('hidden');
        }
        else {
            $("#add-img-button").removeClass('hidden');
        }
    });