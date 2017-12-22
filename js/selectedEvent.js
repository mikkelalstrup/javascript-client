$(document).ready(() => {


    SDK.User.loadNav();

    eventId = SDK.Storage.load("eventId");
    console.log(eventId);

    var createPostDescription;
    var newCommentContent;
    SDK.Event.getEventById(eventId, (data, error) => {

        const event = data;
        console.log(data);
        console.log();


        var owner;
        var ownerName;
        SDK.User.getUserById(event.owner.id, (data, error) => {
            owner = data;
            console.log(owner);
            ownerName = owner.firstName.capitalize() + " " + owner.lastName.capitalize();
            console.log(ownerName);

        });


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
                console.log(createPostDescription);
                SDK.Post.createPostInEvent(localStorage.getItem("CafeNexuscurrentUserId"), createPostDescription, event.id, (data, err) => {

                    console.log(data);

                    setTimeout(function () {
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

            console.log(event);

            $(".createCommentBtnTest").click(function () {
                newCommentContent = $("#inputNewComment").val();
                console.log(newCommentContent);


                SDK.Post.createCommentInPost(localStorage.getItem("CafeNexuscurrentUserId"), newCommentContent, SDK.Storage.load("SelectedComment"), (data, err) => {
                    console.log(data);

                    setTimeout(function () {
                        location.reload();
                    }, 500);
                });


            });

            $(".attendEventBtn").on("click", function () {

                console.log("i ran2");
                SDK.Event.attendEvent(SDK.Storage.load("currentUserId"), event.id, (data, err) => {
                    console.log("i ran");
                    console.log(data);

                    setTimeout(function () {
                        location.reload();
                    }, 500);
                });

            });


            event.posts.forEach((post) => {

                /*  var currentPost = getPostOwner(post.id);*/

                console.log(post);
                console.log(post.owner.id);


                setTimeout(function () {
                    SDK.User.getUserById(post.owner.id, (data, error) => {
                        var postOwner = data;

                        SDK.Post.getPostById(post.id, (data, error) => {
                            var postData = data;

                            console.log(postData);


                            var postId = postData.id;


                            console.log(postOwner);


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
                                    console.log(comment);
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
            // window.location.href = "selectedevent.html";


        }, 100);



    });
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});


