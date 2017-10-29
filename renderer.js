const fs = require ("fs");


function mergeValues (values,content){
    //cycle over keys
    for (var key in values){
        //replace all {{keys}} with values from values object
        content = content.replace("{{" + key + "}}", values[key]);
    }
    //return merged content
        return content;
}

// read html template, add values, write response

function view (templateName, values, response) {
    var fileContents =fs.readFileSync("./views/" + templateName + ".html", {encoding:"utf8"});

    fileContents = mergeValues(values, fileContents);

    //write out the file contents
    response.write(fileContents);
}


module.exports.view = view;
