$(document).ready(() => {
/*Inspiration taget fra Jespers javascript-client*/
  SDK.User.loadNav();

  $("#login-button").click(() => {

    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();


    SDK.User.login(email, password, (data, err ) => {

      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");


      }

      else if (err) {
          console.log("BAd stuff happened");

      }

        window.location.href = "index.html";
    });

  });

});