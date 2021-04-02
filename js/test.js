$(document).ready(function(){

    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        var frm_element = $(this).closest("form").attr('id');
        console.log(frm_element);

    });
    

});