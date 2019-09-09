// basic functionalities
$(document).ready(function () {
  var broker = $('#address').val();
  var data = '';
  var x = '';
  var con = false;
  var a = false;
  $('#btnDisconnect').attr('disabled', true);
  $('#btnSubscribe').attr('disabled', true);
  $('#btnUnsubscribe').attr('disabled', true);
  $('#btnPublish').attr('disabled', true);

  document.getElementById('btnConnect').addEventListener("click", function (e) {
    e.preventDefault();
    client = mqtt.connect(broker);
    con = true;

    client.on("message", function (topic, payload) {
      console.log([topic, payload].join(": "));
      console.log('message recieved..')
      console.log("Published Successfully...");
      console.log("Received \n{ Topic: " + topic + "; Payload: " + payload + " }");
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $('#tblReceive').append('<tr><td>' + topic + '</td><td>' + payload + '</td><td>' + time + '</td></tr>');
    })

    client.on("connect", function () {
      console.log("Successfully connected");
      $("#status").val("Successfully connected")
      $('#btnSubscribe').attr('disabled', false);
      $('#btnDisconnect').attr('disabled', false);
      $('#btnConnect').attr('disabled', true);
      $('#btnPublish').attr('disabled', false);
    })

  })

  document.getElementById('btnDisconnect').addEventListener("click", function (e) {
    e.preventDefault();
    data = '';
    console.log('You are disconnected.');
    client && client.end();
    $('#span').html(data);
    $('#Subscribe-topic').val('');
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
    $('#btnSubscribe').attr('disabled', true);
    $('#btnDisconnect').attr('disabled', true);
    $('#btnSubscribe').attr('disabled', true);
    $('#btnUnsubscribe').attr('disabled', true);
    $('#btnPublish').attr('disabled', true);
    $('#btnConnect').attr('disabled', false);
    $("#status").val("Disconnected")
  })

  document.getElementById('btnPublish').addEventListener("click", function (e) {
    e.preventDefault();
    var dt = new Date();
    client && client.publish($('#Publish-topic').val(), $('#Publish-payload').val());
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $('#tblPublish').append('<tr><td>' + $('#Publish-topic').val() + '</td><td>' + $('#Publish-payload').val() + '</td><td>' + time + '</td></tr>');
  })

  document.getElementById('btnSubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    a = false;
    if (con == true) {
      if ($('#Subscribe-topic').val() == '') {
        alert('No Topic provided!')
      } else {
        client.subscribe($('#Subscribe-topic').val());
        data = 'Subscribed to  ' + $('#Subscribe-topic').val();
        $('#span').html(data);
        x = $('#Subscribe-topic').val();
        $('#btnUnsubscribe').attr('disabled', false);
        $('#btnPublish').attr('disabled', false);
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        $('#tblSubscribe').append('<tr><td>' + $('#Subscribe-topic').val() + '</td><td>' + time + '</td></tr>');
        $("#Publish-topic").val($("#Subscribe-topic").val());
      }
    } else {
      alert('Connect first!');
    }
  })

  document.getElementById('btnUnsubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    $('#span').html('');
    $('#Subscribe-topic').val('');
    $('#btnUnsubscribe').attr('disabled', true);
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
    client.unsubscribe($('#btnUnsubscribe').val());
  })
});