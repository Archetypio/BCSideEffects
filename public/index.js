$(document).ready(function() {
  fetch('/side-effects')
    .then(res => res.json())
    .then(res => {
      const sideEffectsTableHTML = res.sideEffects.map(function(sideEffect) {
        console.log(sideEffect)
        return `<tr><td>${sideEffect.name}</td><td id='${sideEffect.name}'>${sideEffect.total}</td></tr>`;
      });

      $('#sideEffectsTable').html(sideEffectsTableHTML);
    }).catch(function(err) {
      // Error :(
    });

  $('#sideEffectSubmit').click(function(event) {
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    fetch('/increment', {
        method: 'post',
        headers: headers,
        body: JSON.stringify({
          sideEffectName: $('#sideEffectName').val()
        }),
      })
      .then(res => res.json())
      .then(res => {
        $('#' + res.name).html(res.total);
      }).catch(function() {
        // Error
      });
  });
});
