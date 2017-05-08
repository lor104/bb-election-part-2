$(document).ready(function() {

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'json'
  }).done(function(data) {
    for (var i = 0; i < data.candidates.length; i++) {
      candidate = data.candidates[i]

      var cName = candidate.name;
      var cVotes = candidate.votes;

      var cInfo = cName + ' has ' + cVotes + ' votes.';
      var submit = $('<input type="submit" value="Vote!">');
      var hidden = $('<input type="hidden" name="id">');
      var form = $('<form>').attr('id', cName)

    $('<li>').html(cInfo).append(form).appendTo('#candidates');
    $(form).attr('method', 'POST');
    $(form).attr('action', 'https://bb-election-api.herokuapp.com/vote');
    $(form).append(submit).append(hidden);
  }
  });

  $('body').on('submit', 'form', function(e) {
    e.preventDefault();

    $.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      data: {"name" : $(this).attr('id') },
      dataType: 'json'
    }).done(function(data) {
      console.log('done on click')
      console.log(data)
    });
  });

});
