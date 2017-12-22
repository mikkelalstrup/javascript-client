
$(document).ready(() => {


    SDK.User.loadNav();
    const $allEvents = $("#event-group");


    $("#newEventBtn").click(function () {
        const eventStartDateMinute = $("#inputEventStartDateMinute").val();
        const eventStartDateHour = $("#inputEventStartDateHour").val();
        const eventStartDate = $("#inputEventStartDate").val();
        const eventEndDate = $("#inputEventEndDate").val();
        const eventEndDateHour = $("#inputEventEndHour").val();
        const eventEndDateMinute = $("#inputEventEndMinute").val();

        const eventTitle = $("#inputTitleEvent").val();
        const eventDescription = $("#inputDescriptionEvent").val();

        console.log(eventStartDate);
        var eventStartDateString = "" +eventStartDate + " " + eventStartDateHour + ":" + eventStartDateMinute + ":00";
        var eventEndDateString = "" +eventEndDate + " " + eventEndDateHour + ":" + eventEndDateMinute + ":00";
        console.log(eventStartDateString);
        console.log(eventEndDateString);


        SDK.Event.createEvent(SDK.Storage.load("currentUserId"), eventTitle.capitalize(),eventStartDateString,eventEndDateString,eventDescription, (data, err) => {

            setTimeout(function () {
                location.reload();
            }, 500);



        });





    });

    function getCurrentDateString() {
        var currentdate = new Date();
        var currentDateString = ""+

            + currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-"
            + currentdate.getDate() + " "

            console.log(currentDateString);
        return currentDateString;
    }

    $(".createNewEventModalBody").append(`
                <form>
                   <div class="form-group">
                   <label class="control-label" for="inputTitleEvent">Select event start date: </label>
                  <input type="date" id="inputEventStartDate" name="inputEventStartDate" min=${""+ getCurrentDateString()+""}>
                  <label>Hour</label>
                  <select id="inputEventStartDateHour" >
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                    </select>
                     <label>Minute</label>
                     <select id="inputEventStartDateMinute">
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                        <option>60</option>
                    </select>
                  <div>
                 
  
  

                  
                  <div class="form-group">
                    <label class="control-label" for="inputEventEndDate">Select event end date:     </label>
                  <input id="inputEventEndDate" type="date" name="endDate" min=${""+ getCurrentDateString()+""}>
                  <label>Hour</label>
                  <select id="inputEventEndHour" >
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                    </select>
                     <label>Minute</label>
                     <select id="inputEventEndMinute" >
                        <option>00</option>
                        <option>15</option>
                        <option>30</option>
                        <option>45</option>
                        <option>60</option>
                    </select>
                  <div>
                  <div>
                </form>
              </div>                       
            `);


    console.log(getCurrentDateString());





    SDK.Event.getAllEvents((eventData, err) => {

        eventData.forEach((event) => {
            console.log(event.title);
            console.log(event);

            const eventObject = `
            
            <button type="button" style="width: 185px "class="btn btn-primary eventButton" id="${event.id}" data-eventIdSelector="${event.id}"> ${event.title.capitalize()} <br> <br> ${event.startDate}</button>
  `;

            $allEvents.append(eventObject);

        });

    function getEventIdFromButton() {
        return $(this).data("eventidselector");
    }



    $(".eventButton").on("click", $(".eventButton"), function () {






        console.log(this.id);




        const buttonEventId = this.id;
        console.log(buttonEventId);
        //const thisEvent = eventData.find((event) => event.id === buttonEventId);


        SDK.Storage.persist("eventId", buttonEventId);

        window.location = "selectedevent.html";






        });

    });
        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };


        function getOwnerName(id) {


            SDK.User.getUserById(id, (data, error) => {
                var owner = data;

                var ownerName = owner.firstName + owner.lastName;
                console.log(ownerName);
                return ownerName;
            });

        }

});





   /* $(document).on('click', '#myProfileButton', function () {
        var foundUser;


        console.log("profile ran!!!");
        let userId = SDK.Storage.load("currentUserId");
        console.log(userId);

        SDK.User.getUserById(userId, (data, err) => {
            foundUser = data;
            console.log(foundUser.firstName);


            console.log(foundUser);

        });


        $(".page-header").html(`
    <h1>Hi, ${foundUser.firstName} ${foundUser.lastName}</h1>
  `);



        /!*   $(".img-container").html(`
           <img src="${currentUser.avatarUrl}" height="150"/>
         `);*!/

        $(".profile-info").html(`
    <dl>
        <dt>Name</dt>
        <dd>${foundUser.firstName} ${foundUser.lastName}</dd>
        <dt>Email</dt>
        <dd>${foundUser.email}</dd>
        <dt>ID</dt>
        <dd>${foundUser.id}</dd>
     </dl>
  `);
    });


})





        /!*   SDK.User.login(email, password, (data, err ) => {*!/
        /!*           console.log("test2");
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

           });*!/

        /!*
         const $modalTbody = $("#basket-tbody");
         const $checkoutActions = $("#checkout-actions");
         const $nothingInBasketContainer = $("#nothing-in-basket-container");

         function loadBasket() {
           const currentUser = SDK.User.current();
           const basket = SDK.Storage.load("basket") || [];
           let total = 0;

           $nothingInBasketContainer.show();

           if (!basket.length) {
             $("#checkout-table-container").hide();
           } else {
             $nothingInBasketContainer.hide();
           }

           basket.forEach(entry => {
             let subtotal = entry.book.price * entry.count;
             total += subtotal;
             $modalTbody.append(`
               <tr>
                   <td>
                       <img src="${entry.book.imgUrl}" height="120"/>
                   </td>
                   <td>${entry.book.title}</td>
                   <td>${entry.count}</td>
                   <td>kr. ${entry.book.price}</td>
                   <td>kr. ${subtotal}</td>
               </tr>
             `);
           });

           $modalTbody.append(`
             <tr>
               <td colspan="3"></td>
               <td><b>Total</b></td>
               <td>kr. ${total}</td>
             </tr>
           `);

           if (currentUser) {
             $checkoutActions.append(`
             <button class="btn btn-success btn-lg" id="checkout-button">Checkout</button>
           `);
           }
           else {
             $checkoutActions.append(`
             <a href="login.html">
               <button class="btn btn-primary btn-lg">Log in to checkout</button>
             </a>
           `);
           }
         }

         loadBasket();

         $("#clear-basket-button").click(() => {
           SDK.Storage.remove("basket");
           loadBasket();
         });

         $("#checkout-button").click(() => {
           const basket = SDK.Storage.load("basket");
           SDK.Order.create({
             createdById: SDK.User.current().id,
             orderItems: basket.map(orderItem => {
               return {
                 count: orderItem.count,
                 bookId: orderItem.book.id
               }
             })
           }, (err, order) => {
             if (err) throw err;
             $("#order-alert-container").find(".alert-success").show();
             SDK.Storage.remove("basket");
             loadBasket();
             $nothingInBasketContainer.hide();
           });
         });*!/



*!/
*/