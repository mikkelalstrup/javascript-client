$(document).ready(() => {

  SDK.User.loadNav();

  $("#login-button").click(() => {

    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();

console.log("test1");
    SDK.User.login(email, password, (data, err ) => {
        console.log("test2");
      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");

        console.log("fejl 1");
      }

      else if (err) {
          console.log("BAd stuff happened");
              console.log("fejl2");
      }
      console.log("fejl3");
        window.location.href = "index.html";
    });

  });

});