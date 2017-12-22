$(document).ready(() => {


    SDK.User.loadNav();

    eventId = SDK.Storage.load("eventId");


    var createPostDescription;
    var newCommentContent;
    SDK.Event.getEventById(eventId, (data, error) => {

        const event = data;

        var owner;
        var ownerName;
        SDK.User.getUserById(event.owner.id, (data, error) => {
            owner = data;

            ownerName = owner.firstName.capitalize() + " " + owner.lastName.capitalize();


        });

        /*Bruger setTimeout funktionen, da selve serverkaldet skal nå at svare tilbage før man bygger HTML elementer*/
        setTimeout(function () {


            $(".event-header").html(`
                   <div class="panel">
                    <h1 style="text-align: center">${event.title.capitalize()} !</h1>
                    </div>                        
`);

            $(".event-description").append(`
              <div class=well >
                    <h1 style="text-align: center">${event.title.capitalize()}</h1>
                    <button type="button" style="width: 100%" class="btn btn-info btn-lg" data-toggle="modal" data-target="#createPostModal">Create a post</button>
                    <h4></h4>
                    <button type="button" style="width: 100%" class="btn btn-info btn-lg attendEventBtn" id="#attendEventBtn">Attend this event!</button>
               </div>
              <div class="  panel panel-default"> 
                  
                  <div class=panel-heading>About this event!</div>
                  <div class=panel-body>${event.description.capitalize()}</div>
                  <div class=panel-body>Start time: ${event.startDate}</div>
                  <div class=panel-body>End time: ${event.endDate}</div>
                  <div class=panel-body>Creator: ${ownerName}</div>
                  <div class=panel-body>Number of participants: ${event.participants.length}</div>
                  
                  <button type="button" style="width: 100%" class="btn btn-info btn-lg" data-toggle="modal" data-target="#attendingUsersModal">See attending users!</button>
                  
                  
              </div>
                  `);
            $(".attendingUserHeaderModal").append(`
                    <h4 class="modal-title">${event.title.capitalize() + "!"}</h4>
              </div>                       
            `);

            $(".createPostModalHeader").append(`
                    <h4 class="modal-title">Fill out the description to create your own post!</h4>
              </div>                       
            `);

            $("#createPostBtn").click(function () {

                createPostDescription = $("#inputNewPostDescription").val();

                SDK.Post.createPostInEvent(localStorage.getItem("CafeNexuscurrentUserId"), createPostDescription, event.id, (data, err) => {



                    setTimeout(function () {
                        /*Opdaterer siden når man har oprettet en ny kommentar*/
                        location.reload();
                    }, 500);

                });

            });


            $(".attendingUserModal").append(`
                   <div class="  panel panel-default"> 
                  <div class=panel-heading>Attending users!</div>
              </div>                       
            `);

            event.participants.forEach((participant) => {
                $(".attendingUserModal").append(`
                  <div class=panel-heading>${participant.firstName.capitalize() + " " + participant.lastName.capitalize()}</div>
              </div>                       
            `);

            });



            $(".createCommentBtnTest").click(function () {
                newCommentContent = $("#inputNewComment").val();



                SDK.Post.createCommentInPost(localStorage.getItem("CafeNexuscurrentUserId"), newCommentContent, SDK.Storage.load("SelectedComment"), (data, err) => {


                    setTimeout(function () {
                        location.reload();
                    }, 500);
                });


            });

            $(".attendEventBtn").on("click", function () {

                SDK.Event.attendEvent(SDK.Storage.load("currentUserId"), event.id, (data, err) => {

                    setTimeout(function () {
                        location.reload();
                    }, 500);
                });

            });


            event.posts.forEach((post) => {



                setTimeout(function () {
                    SDK.User.getUserById(post.owner.id, (data, error) => {
                        var postOwner = data;

                        SDK.Post.getPostById(post.id, (data, error) => {
                            var postData = data;




                            var postId = postData.id;





                            $(".event-content").append(`
                
                <div class="  panel panel-default"> 
                  
                  <div class=panel-heading style="height: 50px">
                        <div style="height:100% "class="col-lg-8">
                           ${postOwner.firstName.capitalize() + " " + postOwner.lastName.capitalize()}
                        </div>
                        <div class="col-lg-4"> 
                               <button style="float: right ; height: 30px ; width: 70%; text-align: center; line-height: 10px" 
                               class=" btn btn-info btn-lg selectedPostBtn" data-toggle="modal" data-target="#commentOnPostModal" id=${"" + post.id}> Comment!</button>
                         
                        </div>
                  
                  
                  </div>
                  <div class=panel-body>${post.content}
                  
                  
                        <div class="event-comment" id=${"comment" + postId} > 
                                <br>
                        </div>
                  
                  
                  </div>
                  
                  
                    
                  
                  
              </div>
                `)

                            $(".selectedPostBtn").on("click", function () {

                                SDK.Storage.persist("SelectedComment", this.id);

                            });


                            postData.comments.forEach((comment) => {
                                SDK.User.getUserById(comment.owner.id, (data, error) => {
                                    var commentOwner = data;


                                    $("#comment" + comment.parent.id).append(`
                                    
                                    <div class="  panel panel-default"> 
                                      
                                      
                                      <div class=panel-heading>
                                            ${commentOwner.firstName.capitalize() + " " + commentOwner.lastName.capitalize()}
                                      </div>
                                      <div class=panel-body>${comment.content}</div>
                                        
                                      
                                      
                                    </div>
                                    `);
                                });
                            });
                        });
                    });
                }, 100);

            });



        }, 100);



    });

    /*Denne funktion bruger til at lave det først bogstav med stort
    * Inspiration fra https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
    * */
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});


