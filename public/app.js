function getUser(callback) {
  $('#loading').show();
  $.get({
    url: '/me',
    dataType: 'json'
  }).always(function(data, status) {
    $('#loading').hide();
    if (data && data.account) {
      callback(data.account);
    } else {
      callback(null);
    }
  })
}

function loginFormSubmitHandler(event) {
  var form = event.currentTarget;
  var login = form.emailInput.value;
  var password = form.passwordInput.value;
  event.preventDefault();
  $('#loading').show();
  $('#login-error').hide();
  $.post({
    url: '/login',
    dataType: 'json',
    data: {
      login: login,
      password: password
    }
  }).always(function(data, status) {
    $('#loading').hide();
    if( data && data.account) {
      renderUserState(data.account);
    } else {
      $('#login-error').show();
      $('#login-error').text(data.responseJSON && data.responseJSON.message || 'Unknown login error');
    }
  })
}

function renderUserState(user){
  $('#loading').hide();
  if(user){
    $('#login-form').hide();
    $('#user-data').show();
    $('#user-object').text(JSON.stringify(user, null, 2));
  }else{
    $('#login-form').show();
    $('#user-data').hide();
  }
}

function logout() {
  $.post('/logout')
    .always(function () {
      getUser(function(user) {
        $('#loading').hide();
        renderUserState(user);
      });
    })
}

$( document ).ready(function() {

  $('#login-form').on('submit', loginFormSubmitHandler);
  $('#logout').on('click', logout);

  getUser(function(user) {
    renderUserState(user);
  });
});