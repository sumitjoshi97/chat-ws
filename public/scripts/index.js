const ws = new WebSocket('ws://localhost:8080');

$('form').submit(function () {
    name = $('#name').val() ? $('#name').val() : 'Guest';
    $('#name-div').hide();
    $('#welcome').text(name);

    ws.send(JSON.stringify({
        name: name,
        message: $('#message').val()
    }));
    $('#message').focus();
    $('#message').val('');
    return false;
});

ws.onmessage = function (e) {
    $('#messages').append(
        $('<li>').html(e.data)
    );
};

ws.onerror = function (e) {
    $('#messages').append(
        $('<li>').text('<span style="color: red;">Error</span>' + e.data)
    );
};

