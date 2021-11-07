/* To do:
    * Add winrate and last battle time
    * Add individual player details tab
    * In individual player add both last 50 battles and overall, for main just the last 50 battles 
    * localStorage
    * Add Private API tab
*/

function addLocalStorage(){
    //get the input
    var usernameInput = document.getElementById("uname");
    console.log(usernameInput.value);
    var x = localStorage.length;
    console.log(x)
    
    //localStorage.clear();
    //set the username as key
    if (usernameInput.value != "") {
        localStorage.setItem(usernameInput.value, usernameInput.value);
        document.getElementById("error-message").innerHTML = "";
        createTable(usernameInput.value);
        usernameInput.value = "";
    } else {
        document.getElementById("error-message").innerHTML = "Username could not be empty. ";
    }
    //localStorage.setItem(usernameInput.value, 'account')
    
}

function deleteLocalStorage(username){
    localStorage.removeItem(username);    
}

function getWinRate(user) {
    $.getJSON('https://api2.splinterlands.com/battle/history?player=' + user, function(data) {
    console.log('battle/history', data);    
        winCount = 0;
        drawCount = 0;
        var dateTimeAgo = "";
        for (var i = 0; i < data.battles.length; i++) {

            var win = data.battles[i].winner;
                
            if(data.battles[i].winner == user){win = "!Winer!" + "[" + JSON.parse(data.battles[i].dec_info).reward.toFixed(2) + "DEC]"}
            if(data.battles[i].winner == user){ winCount++}
            if(data.battles[i].winner == "DRAW"){ drawCount++}
            dateTimeAgo = moment(data.battles[0].created_date).fromNow();
        }
        console.log(user + " wins " + winCount + " times, and " + drawCount + " draws. " + user + "'s winrate is " + ((winCount/50)*100) + "%. Last Battle was " + dateTimeAgo)
    });
}