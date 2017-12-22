
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


        var eventStartDateString = "" +eventStartDate + " " + eventStartDateHour + ":" + eventStartDateMinute + ":00";
        var eventEndDateString = "" +eventEndDate + " " + eventEndDateHour + ":" + eventEndDateMinute + ":00";



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


            const eventObject = `
            
            <button type="button" style="width: 185px "class="btn btn-primary eventButton" id="${event.id}" data-eventIdSelector="${event.id}"> ${event.title.capitalize()} <br> <br> ${event.startDate}</button>
  `;

            $allEvents.append(eventObject);

        });

    function getEventIdFromButton() {
        return $(this).data("eventidselector");
    }



    $(".eventButton").on("click", $(".eventButton"), function () {











        const buttonEventId = this.id;




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

                return ownerName;
            });

        }

});





