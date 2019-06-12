$('.edit-info').blur(function () {
    let value = $(this).val();
    let attribute = $(this).attr('data-attribute');
    let tab = {'value': value, 'entity':'User', 'attribute':attribute}
    var varJson = JSON.stringify(tab);
    console.log(varJson)
    var csrf_token = getCookie('csrftoken');
    $.ajax({
        type: "POST",
        headers: {"X-CSRFToken": csrf_token},
        url: "ajax_update_user/",
        dataType: "json",
        traditional: true,
        crossDomain: true,
        data: {'data': varJson},
        success: function (data) {
           console.log(data)
        }
    });
});