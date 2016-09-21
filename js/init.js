window.onload = function() {

    var messages = [];
    var socket = io();
    var field = document.getElementById("m");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("messages");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {

                html += '<li><b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '</li>';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });


  $('form').submit(function(){ 
    if(name.value == "") {
            alert("Please type your name!");
        } else {
            var text = field.value;
            socket.emit('send', { message: text, username: name.value });
            field.value = "";
        }    
    return false;
  });

}