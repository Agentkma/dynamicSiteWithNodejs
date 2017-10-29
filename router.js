const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const queryString = require('querystring');
const commonHeader = {'Content-type':'text/html'};


// home route
function home(request,response) {
    if (request.url === '/') {
        // in case request sent incorrectly
        if(request.method.toLowerCase()=== "get"){
            response.writeHead(200, commonHeader);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        }

        else {
            /// else if url === "/" && POST
            //get post data from body
            request.on('data', function(postBody){
            // extract username
            const query = queryString.parse(postBody.toString());
            // redirect to /:username
            response.writeHead(303, {"Location": "/" + query.username});
            response.end();
            });
        }
    }
}

//halndle HTTP route  GET / :username i.e. kevinanderson6
function user(request,response) {
    let username = request.url.replace("/", "");


    if (username.length > 0) {
        response.writeHead(200, commonHeader);
        renderer.view("header", {}, response);

        let studentProfile = new Profile(username);

        studentProfile.on("end", (profileJSON)=>{
            //show profile
            //store values we need ...get values from the API
            var values = {
                avatarUrl:profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges:profileJSON.badges.length,
                javascriptPoints:profileJSON.points.JavaScript,
            };

            //response
            renderer.view("profile", values, response);

            //values are correct for user profile at this point
            renderer.view("footer", {}, response);
            response.end();
        });

        studentProfile.on("error", (error)=>{
            //show error
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });

    }
}


// export routes so app.js can use them
module.exports.home = home;
module.exports.user = user;
