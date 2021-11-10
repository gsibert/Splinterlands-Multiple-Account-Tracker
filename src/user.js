/* To do:
    * Add winrate and last battle time -done
    * Add individual player details tab
    * In individual player add both last 50 battles and overall, for main just the last 50 battles 
    * localStorage - do not allow undefined - done
    * add summary of accounts functions
    * add validation error css
*/

function addLocalStorage(){
    //get the input - update 1.2 the agent 
    var usernameInput = document.getElementById("uname");
    //console.log(usernameInput.value);
    //use this for total accounts
    var totalAccounts = localStorage.length;
    //console.log(x)

    let playerData = getPlayerData(usernameInput.value);
    playerData.then((data) => {
        //console.log(!(data.name === undefined))
        if (!(data.name === undefined)) {
            //clear error message
            document.getElementById("error-message").innerHTML = "";
            //add row
            createTable(usernameInput.value);
            //create key and value using userinput
            localStorage.setItem(usernameInput.value, usernameInput.value);
            //clear the value of input
            usernameInput.value = "";
            alert("Success! User has been added")
        } else {
            //return error message to user
            document.getElementById("error-message").innerHTML = "Invalid Username. ";
        }
    })
    //localStorage.clear();
    //localStorage.setItem(usernameInput.value, 'account')*/    
}


function deleteLocalStorage(username){
    localStorage.removeItem(username);    
}

function clearLocalStorage(username){
    localStorage.clear(username);
    location.reload();
}