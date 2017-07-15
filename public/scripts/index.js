const ws = new WebSocket('ws://localhost:8080');

$('form').submit(function() {
    name = $('#name').val() ? $('#name').val() : 'Guest';
    $('#name-div').hide();
    $('#welcome').text(name);

    ws.send(JSON.stringify({
        name: name,
        message: $('#message').val()
    })); 
})