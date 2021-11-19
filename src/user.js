/* To do:
    * Add winrate and last battle time -done
    * Add individual player details tab
    * In individual player add both last 50 battles and overall, for main just the last 50 battles 
    * localStorage - do not allow undefined - done
    * add summary of accounts functions
    * add validation error css
*/

var api3 = 'https://game-api.splinterlands.io',
    api2 = 'https://api.splinterlands.io',
    api1 = 'https://api2.splinterlands.com',
    api = api1;

function addLocalStorage(){
    //get the input
    var usernameInput = document.getElementById("uname");
    //console.log(usernameInput.value);
    //create an array from the input
    var usernames = usernameInput.value.toString().split(",");
    //console.log(usernames);
    //loop thru the input to enter the account
    for (let i = 0; i < usernames.length; i++) {
        console.log(usernames[i] + "This is from the for loop")
        let playerData = getPlayerData(usernames[i]);
        playerData.then((data) => {
            //console.log(!(data.name === undefined))
            if (!(data.name === undefined)) {
                //clear error message
                document.getElementById("error-message").innerHTML = "";
                //add row
                createTable(usernames[i]);
                //create key and value using userinput
                localStorage.setItem(usernames[i], usernames[i]);
            } else {
                //return error message to user
                alert(usernames[i] + " is not a valid username");
            }
        })
    }
    //clear the value of input
    usernameInput.value = "";  
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

function addBalance(balance,id) {
    let targetContainer = document.getElementById(id).innerHTML
    let targetFloat = parseFloat(targetContainer)
    document.getElementById(id).innerHTML = parseFloat(targetFloat += balance).toFixed(2);
}

function deleteBalance(balance,id) {
    let targetContainer = document.getElementById(id).innerHTML
    let targetFloat = parseFloat(targetContainer)
    document.getElementById(id).innerHTML = parseFloat(targetFloat -= balance).toFixed(2);
}

async function coinGecoPh(coinID,elementId,coinAmmount) {
    var price = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coinID}`)
	.then((data) => {return data.market_data.current_price.php}); 
    console.log(price)
    price = parseFloat(price);
    priceInPhp = price * coinAmmount;
    document.getElementById(elementId).innerHTML = "(" + price + " PHP)"
}

async function coinGecoUsd(coinID,elementId,coinAmmount) {
    var price = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coinID}`)
	.then((data) => {return data.market_data.current_price.usd}); 
    console.log(price);
    price = parseFloat(price);
    priceInUsd = price * coinAmmount;
    document.getElementById(elementId).innerHTML = "(" + price + " USD)";
}

