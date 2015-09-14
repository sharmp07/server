$(document).ready(
  function(){
    var socket = io();
    $('#sendButton').click(
      function(){
        var message = $('#inputBox').val();
        var name = $('#nameTag').text();
        socket.emit('comm', name + ":" + message);
        $('#tail').append($('<p>').text(name + ":" + message));
        $('#inputBox').val('');
        return false;
      }
    );
    $('#inputBox').keyup(
      function(event){
        if(event.keyCode == 13){
          $('#sendButton').click();
        }
      }
    );
    socket.on(
      'comm',
      function (message) {
        $('#tail').append($('<p>').text(message));
      }
    );
    $('#sendName').click(
      function(){
        var name = $('#inputName').val();
        document.location = '/main?name=' + name
      }
    );
    $('#datePickerTo').datepicker();
    $('#datePickerFrom').datepicker();
    $('#submitDateTeamButton').click(
      function(){

        var team = $('#teamName').val();
        var dateFrom = $('#datePickerFrom').val();
        var dateTo = $('#datePickerTo').val();

        socket.emit('teamDate', {'team': team, 'dateFrom': dateFrom, 'dateTo':dateTo });

      }
    );
    socket.on(
      'teamDate',
      function (message) {
        var data = google.visualization.arrayToDataTable(message.value);

        var options = {
          title: 'Team Statistics for team ' + message.filters.team + ' from ' + message.filters.dateFrom + " to " + message.filters.dateTo
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
    );
  }
);