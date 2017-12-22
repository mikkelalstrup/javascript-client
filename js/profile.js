
$(document).ready(() => {

  SDK.User.loadNav();

    var currentUser;
    let userId = SDK.Storage.load("chosenProfileId");

    SDK.User.getUserById(userId, (data, err) => {
        currentUser = data;




        if (SDK.Storage.load("chosenProfileId") === SDK.Storage.load("currentUserId")){
            $(".page-header").html(`
           <h1>Hi, ${currentUser.firstName.capitalize()}</h1>
           <h1>This is your profile page!</h1>
         `);
        }

        else {
            $(".page-header").html(`
           <h1>Hi, This is ${currentUser.firstName.capitalize()}s profile page!</h1>
         `);
        }



        $(".profile-description").html(`
            <div class="panel panel-default">
                <div class="panel-heading">Description</div>
                <div class="panel-body">${currentUser.description.capitalize()}</div>
            </div>
  `);

        $(".profile-info").html(`
    <dl>
        <dt>Name</dt>
        <dd>${currentUser.firstName.capitalize()} ${currentUser.lastName.capitalize()}</dd>
        <dt>Email</dt>
        <dd>${currentUser.email}</dd>
        <dt>ID</dt>
        <dd>${currentUser.id}</dd>
        <dt>Gender</dt>
        <dd>${currentUser.gender.StringifyGender(currentUser.gender)}</dd>
        <dt>Education status</dt>
        <dd>${currentUser.major.capitalize()} , ${currentUser.semester} sem.</dd>
        
     </dl>
  `);
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



  /*SDK.Order.findMine((err, orders) => {
    if(err) throw err;
    orders.forEach(order => {
      $basketTbody.append(`
        <tr>
            <td>${order.id}</td>
            <td>${parseOrderItems(order.orderItems)}</td>
            <td>kr. ${sumTotal(order.orderItems)}</td>
        </tr>
      `);
    });
  });

  function parseOrderItems(items){
    return items.map(item => {
      return item.count + " x " + item.bookInfo.title
    }).join(", ");
  }

  function sumTotal(items){
    let total = 0;
    items.forEach(item => {
      total += item.count * item.bookInfo.price
    });
    return total;
  }*/


});