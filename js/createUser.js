$(document).ready(() => {

    SDK.User.loadNav();

    $("#createUser-button").click(() => {
        console.log("ran");
        const firstName = $("#inputFirstName").val();
        const lastName = $("#inputLastName").val();
        const gender = $("#inputGender").val();
        const description = "Welcome to my profile description!";
        const major = $("#inputMajor").val();
        const semester = $("#inputSemester").val();
        const email = $("#inputEmailNewUser").val();
        const password = $("#inputPasswordNewUser").val();


        console.log(semester);
        SDK.User.createUser(firstName, lastName, email, description, gender, major, password, semester, (data, err) => {


            console.log(err);
            console.log(data);

            var code
            setTimeout(function () {
                 code = statusCodeOfCall;




            console.log(code);
            if (code == 500) {
                $(".form-group").addClass("has-error");
                console.log("500 ran");
                $(".createUserErr").html(`
                    <h4>Failed to input correction information</h4>
                    
                `)

            }



            else if (code == 400) {
                $(".form-group").addClass("has-error");
                $(".createUserErr").html(`
                    <h4>User email already exist</h4>
                    
                `)

            }


            else {

                alert("Your user has been created! Please log in")
                window.location.href = "login.html";



            }
            }, 500)


        });
    });

});