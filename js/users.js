
$(document).ready(() => {

  SDK.User.loadNav();

    var currentUser;
    let userId = SDK.Storage.load("currentUserId");

    SDK.User.getAllUsers( (data, err) => {

        const allUsers = data;




         $(".page-header").html(`
           <h1>Hi, Here is a list of all users</h1>
         `);

        allUsers.forEach((user) => {


            $(".usersList").append(`
            <tr class="clickable-row" data-href='profile.html' data-id=${user.id}>
                <td data-id=${user.id}>${user.firstName.capitalize()}</td>
                <td data-id=${user.id}>${user.lastName.capitalize()}</td>
                <td data-id=${user.id}>${user.email}</td>
               
            </tr>
            
            `)

        });
        // inspiration from https://stackoverflow.com/questions/17147821/how-to-make-a-whole-row-in-a-table-clickable-as-a-link
        $(".clickable-row").click(function() {
            var selectedId =  $(this).data("id");
            SDK.Storage.persist("chosenProfileId",selectedId);
            console.log($(this).data("id"));
            window.location = $(this).data("href");
        });


        console.log(currentUser);

    });

    // Taken from : https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    //Used to capitalize first letter of string
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    String.prototype.StringifyGender = function (gender) {
        if (gender == "m"){
          return "Male";
        }
        else {
          return "Female";
        }
    }






});