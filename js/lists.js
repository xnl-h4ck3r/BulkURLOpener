function saveList(Id, resultsArray) {
    localStorage.setItem(Id, resultsArray);
    localStorage.setItem("maxID", Id);
    alert("List saved successfully!");
    window.close();
}

function saveSettings(settingsArray) {
    removeList("settings", false);
    localStorage.setItem("settings", settingsArray);
    alert("Settings successfully saved!");
    window.close();
}

function loadList(Id) {
    var resultsArray = new Array();
    var results = localStorage.getItem(Id);
    resultsArray = results.split(',');
    return resultsArray;
}

function getCurrentMaxID() {
    if(localStorage.getItem("maxID") == "NaN") {
        return 0;
    }
    return localStorage.getItem("maxID");
}

function removeList(id, noAlert) {
    for (var i = 0; i < localStorage.length; i++){
        var tempArray = loadList(localStorage.key(i));        
        if(tempArray[1] == id && tempArray.length > 1) {             
            localStorage.removeItem(localStorage.key(i));
            $('select option[id="' + id + '"]').remove();
            if(!(noAlert)) {
                alert("List successfully deleted");
            }            
        }        
    }
}

function removeTempList() {
    for (var i = 0; i < localStorage.length; i++){
        var tempArray = loadList(localStorage.key(i));        
        if(tempArray[0] == "temp") {             
            localStorage.removeItem(localStorage.key(i));       
        }        
    }
}

function removeLinksToOpenList() {
    for (var i = 0; i < localStorage.length; i++){
        var tempArray = loadList(localStorage.key(i));        
        if(tempArray[0] == "linksToOpen") {             
            localStorage.removeItem(localStorage.key(i));       
        }        
    }
}

function getNextAvailableID() {
    var availableID;
    availableID = 0;
    for (var i = 0; i < localStorage.length; i++){        
        var resultsArray = new Array();
        var results = localStorage.getItem(localStorage.key(i));        
        resultsArray = results.split(',');        
        if(resultsArray[0] == "listStorage") {                        
            availableID = +resultsArray[1] + 1;
        }
    }
    return availableID;
}

function getParameterByName(name, url) {
    //Gets variable from query string by name. Use: var VIDINURL = getParameterByName('VID');
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function removeQueryString(URL) {
  //Removes the query string from a URL provided Use: var URL = window.location.href; URL = removeQueryString(URL);
  URL = URL.replace(/(\?.*)|(#.*)/g, "");
  return URL;
}

function outputAllLists() {
    var counter = 0;
    for (var i = 0; i < localStorage.length; i++){
        console.log(loadList(localStorage.key(i)));
        counter = i;
    }
    if(counter == 0) {
        console.log("No lists found");
    }
}