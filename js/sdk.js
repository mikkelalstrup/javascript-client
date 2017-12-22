//Inspiration taget fra jesper javascript-client repository

//statusCodeOfCall bliver brugt til at sætte serverens status kode
var statusCodeOfCall = 200;
const SDK = {

        serverURL: "http://localhost:8080/api",

        request: (options, cb) => {

            // Her sætter man token fra local storage
            let token = {"AUTHORIZATION": "Bearer " + localStorage.getItem("CafeNexustoken")}

            /*Dette ajax kald er standard for alle kald til serveren (på nær login)
            ,da man forventer at al kommunikation er gennem JSON objekter*/

            $.ajax({
                url: SDK.serverURL + options.url,
                method: options.method,
                headers: token,
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(options.data),


                success: (data, status , xhr) => {
                    cb(data, status, xhr);
                    statusCodeOfCall = xhr.status;
                },
                error: (xhr, status, errorThrown) => {
                    cb({xhr: xhr, status: status, error: errorThrown});

                    statusCodeOfCall = xhr.status;

                    },


            });

        },
        /* Bruger denne ajax metode specifikt til at logge ind, da man modtager token i form af en string*/
        loginRequest: (options, cb) => {
            $.ajax({
                url: SDK.serverURL + "/auth/",
                method: options.method,
                contentType: "application/json",
                dataType: 'text',
                data: JSON.stringify(options.data),


                success: (data, status, xhr) => {
                    cb(data, status, xhr);
                },
                error: (xhr, status, errorThrown) => {
                    cb({xhr: xhr, status: status, error: errorThrown});

                }


            })
        },


        Event: {

            getAllEvents: (cb) => {
                SDK.request({
                        method: "GET",
                        url: "/events",
                        headers: {
                            Authorization: "Bearer" + localStorage.getItem("token")
                        }

                    },
                    cb);
            },

            getEventById: (id, cb) => {
                SDK.request({
                        method: "GET",
                        url: "/events/" + id


                    },

                    cb);
            },

            attendEvent: (userId, eventId, cb) => {
                SDK.request({
                        data: {
                            user_id: userId,

                            event_id: eventId


                        },

                        url: "/events/subscribe",
                        method: "POST"

                    },
                    (data, err) => {


                        cb();

                    });

            },

            createEvent: (owner_id, title, startDate, endDate, description, cb) => {
                SDK.request({
                        data: {
                            owner_id : owner_id,
                            title : title,
                            startDate : startDate,
                            endDate : endDate,
                            description : description
                        },

                        url: "/events/",
                        method: "POST"

                    },
                    (data, err) => {


                        cb();

                    });

            },


        },

        Post: {
            getPostById: (id, cb) => {
                SDK.request({
                        method: "GET",
                        url: "/posts/" + id
                    },
                    cb);
            },

            createPostInEvent: (ownerId, content, eventId, cb) => {
                SDK.request({
                        data: {
                            owner: ownerId,
                            content: content,
                            event: eventId


                        },

                        url: "/posts",
                        method: "POST"

                    },
                    (data, err) => {


                        cb();

                    });

            },

            createCommentInPost: (ownerId, content, parent, cb) => {
                SDK.request({
                        data: {
                            owner: ownerId,
                            content: content,
                            parent: parent


                        },

                        url: "/posts",
                        method: "POST"

                    },
                    (data, err) => {


                        cb();

                    });

            },
        },

            User: {

                currentUserID: () => {
                    return localStorage.getItem("userId");

                },

                getUserById: (id, cb) => {
                    SDK.request({
                            method: "GET",
                            url: "/users/" + id


                        },
                        cb);
                },

                getAllUsers: (cb) => {
                    SDK.request({
                            method: "GET",
                            url: "/users",
                            headers: {
                                Authorization: "Bearer" + localStorage.getItem("token")
                            }

                        },
                        cb);
                },
                createUser: (firstName, lastName, email, description, gender, major, password, semester, cb) => {
                    SDK.request({
                            data: {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                gender: gender,
                                major: major,
                                semester: semester,
                                password: password,
                                description: description


                            },

                            url: "/users",
                            method: "POST"

                        },
                        (data, err) => {


                            cb();

                        });

                },

                logOut: () => {
                    SDK.Storage.remove("token");
                    SDK.Storage.remove("currentUserId");
                    //SDK.Storage.remove("user");
                    window.location.href = "login.html";
                },

                login: (email, password, cb) => {
                    SDK.loginRequest({
                        data: {
                            email: email,
                            password: password
                        },

                        method: "POST",


                    }, (data, err) => {


                        let token = data;
                        console.log(token);

                        localStorage.setItem("token", token);

                        SDK.Storage.persist("token", token);


                        // Decoding token to get userId
                        // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript

                        var base64Url = token.split('.')[1];
                        var base64 = base64Url.replace('-', '+').replace('_', '/');

                        var jsonUser = JSON.parse(window.atob(base64));

                        SDK.Storage.persist("currentUserEmail", jsonUser.email);
                        SDK.Storage.persist("currentUserId", jsonUser.id);


                        if (err) return cb(err);

                        cb();
                    });
                },

                current: () => {
                    return SDK.Storage.load("currentUserId");
                },


                /*Inspiration fra Jespers javaScript-client
                * loadNav funktionen sørger for at sætte navigationsbaren alt efter om man er logget ind eller ej
                * */
                loadNav: (cb) => {
                    $("#nav-container").load("nav.html", () => {
                        const currentUser = SDK.User.current();
                        if (currentUser) {
                            $(".navbar-right").html(`
            <li><a href="index.html">Frontpage</a></li>
             <li><a href="events.html">Events</a></li>
            <li><a href="users.html">Cafe Nexus Users</a></li>
            <li><a id="myProfileButton" class="navProfileBtn">Your Profile</a></li>
            <li><a href="#" id="logout-link">Log out</a></li>
          `);


                            $(".navProfileBtn").click( function () {
                                SDK.Storage.persist("chosenProfileId", SDK.Storage.load("currentUserId"))
                                window.location = "profile.html";
                            });
                        }


                        else {
                            $(".navbar-right").html(`
            <li> <a href="createUser.html">New User?</a></li>
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
                        }
                        $("#logout-link").click(() => SDK.User.logOut());
                        cb && cb();
                    });
                }


            },


    /*Inspiration fra Jespers javascript-client*/
            Storage: {
                prefix: "CafeNexus",
                persist: (key, value) => {
                    window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
                },
                load: (key) => {
                    const val = window.localStorage.getItem(SDK.Storage.prefix + key);
                    try {
                        return JSON.parse(val);
                    }
                    catch (e) {
                        return val;
                    }
                },

                remove: (key) => {
                    window.localStorage.removeItem(SDK.Storage.prefix + key);
                }
            },



    }
;