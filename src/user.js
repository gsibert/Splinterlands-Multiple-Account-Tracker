/* To do:
    * Add winrate and last battle time -done
    * Add individual player details tab
    * In individual player add both last 50 battles and overall, for main just the last 50 battles 
    * localStorage - do not allow undefined - done
    * add summary of accounts functions done
    * add validation error css
*/

var api3 = 'https://game-api.splinterlands.io',
    api2 = 'https://api.splinterlands.io',
    api1 = 'https://api2.splinterlands.com',
    api = api1;


async function getPlayerData(player) {
    let res;
    try {
        res = await $.getJSON(`${api}/players/details?name=${player}`);
        return res;
    } catch (error) {
      console.log(error);
    }    
}


async function getPlayerBalance(player) {
  let res 
  try {
      res = await $.getJSON(`${api}/players/balances?username=${player}`);
      return res;
  } catch (error) {
    console.log(error);
  }
}


async function getBattleHistory(player) {
  let res 
  try {
      res = $.getJSON(`${api}/battle/history?player=${player}`);
      return res;
  } catch (error) {
    console.log(error);
  }
}

//rentvsgain
async function getCards(player) {
  let res 
  try {
      res = $.getJSON(`${api}/cards/collection/${player}`);
      return res;
  } catch (error) {
    console.log(error);
  }
}

//rentvsgain
async function getDecTransactions(player) {
  let res 
  try {
      res = $.getJSON(`${api}/players/balance_history?username=${player}&token_type=DEC`);
      return res;
  } catch (error) {
    console.log(error);
  }
}


async function addLocalStorage(){
    //get the input
    var usernameInput = document.getElementById("uname");
    //console.log(usernameInput.value);
    //create an array from the input
    var usernames = usernameInput.value.toString().split(",");
    //console.log(usernames);
    //loop thru the input to enter the account
    for (let i = 0; i < usernames.length; i++) {
        let playerData = await getPlayerData(usernames[i]).then((data) => {
            //console.log(!(data.name === undefined))
            if (!(data.name === undefined)) {
                //clear error message
                document.getElementById("error-message").innerHTML = "";
                //add row
                createTable(usernames[i]);
                let oldData = [] 
                let local = localStorage.getItem("accounts");
                if ( local == null ) {
                    oldData.push(usernames[i]);
                    oldData = oldData.filter(function (el) { return el != null; });
                    localStorage.setItem("accounts", oldData)
                } else {
                    oldData.push(localStorage.getItem("accounts"));
                    oldData.push(usernames[i]);
                    oldData = oldData.filter(function (el) { return el != null; });
                    localStorage.setItem("accounts", oldData);
                }
            } else {
                //return error message to user
                alert(usernames[i] + " is not a valid username");
            }
        })
    }
    //clear the value of input
    usernameInput.value = "";
    setTimeout(function(){ currencyCards() }, 5000);  
    //localStorage.clear();
    //localStorage.setItem(usernameInput.value, 'account')*/    
}


function deleteLocalStorage(username){
    let oldData = []; 
    oldData.push(localStorage.getItem("accounts"));
    oldData = oldData.toString().split(",")
    let unsernameIndex = oldData.indexOf(username);
    oldData.splice(unsernameIndex,1);
    oldData = oldData.filter(function (el) { return el != null; });
    localStorage.setItem("accounts", oldData);
}


function clearLocalStorage(){
    localStorage.removeItem("accounts");
    //localStorage.clear();
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


function currencyCards() {
      if (localStorage.getItem("currency")) {
        console.log("Currency is set")
      } else {
        let defaultCurrency = document.getElementById("currency").value;
        localStorage.setItem("currency",defaultCurrency)
      }

      try {
        let currency = localStorage.getItem("currency");
        coinGecoPrice(currency, "dark-energy-crystals", "decCurrency", "dec", 5)
        coinGecoPrice(currency, "splinterlands","spsCurrency","sps", 5)
        coinGecoPrice(currency, "splinterlands","spspCurrency","spsp", 5)
        coinGecoPrice(currency, "dark-energy-crystals", "decPrice", "one", 5)
        coinGecoPrice(currency, "splinterlands","spsPrice","one", 5)
      } catch (e) {
        console.log(e);
        coinGecoPrice("usd", "dark-energy-crystals","decCurrency","dec", 5)
        coinGecoPrice("usd", "splinterlands","spsCurrency","sps", 5)
        coinGecoPrice("usd", "splinterlands","spspCurrency","spsp", 5)
        coinGecoPrice("usd", "dark-energy-crystals", "decPrice", "one", 5)
        coinGecoPrice("usd", "splinterlands","spsPrice","one", 5)
      };
}

function incomeCurrencyCards() {
  if (localStorage.getItem("currency")) {
    console.log("Currency is set")
  } else {
    let defaultCurrency = document.getElementById("currency").value;
    localStorage.setItem("currency",defaultCurrency)
  }

  try {
    let currency = localStorage.getItem("currency");
    coinGecoPrice(currency, "dark-energy-crystals", "earnedCurrency", "earned", 5)
    coinGecoPrice(currency, "dark-energy-crystals","rentCurrency","rent", 5)
    coinGecoPrice(currency, "dark-energy-crystals","netCurrency","net", 5)
  } catch (e) {
    console.log(e);
    coinGecoPrice("usd", "dark-energy-crystals", "earnedCurrency", "earned", 5)
    coinGecoPrice("usd", "dark-energy-crystals","rentCurrency","rent", 5)
    coinGecoPrice("usd", "dark-energy-crystals","netCurrency","net", 5)
    
  };
}


async function coinGecoPriceOld(currency,coinID,elementId,coinAmmount,decimals) {
    var price = await $.getJSON(`https://api.coingecko.com/api/v3/simple/price?ids=${coinID}&vs_currencies=${currency}`)
	.then((data) => {return data[coinID][currency]}); 
    price = parseFloat(price);
    coinAmmount = parseFloat(document.getElementById(coinAmmount).innerHTML);
    priceInCurr = price * coinAmmount;
    document.getElementById(elementId).innerHTML = "(" + priceInCurr.toFixed(decimals) + " " + currency.toUpperCase() + ")"
}

async function coinGecoPrice(currency,coinID,elementId,coinAmmount,decimals) {
    var price = await $.getJSON(`https://api.coingecko.com/api/v3/coins/${coinID}`)
	.then((data) => {return data["market_data"]["current_price"][currency]}); 
    price = parseFloat(price);
    //console.log("current price in " + currency + " is " + price)
    coinAmmount = parseFloat(document.getElementById(coinAmmount).innerHTML);
    priceInCurr = price * coinAmmount;
    //alert(coinID + " Price is " + price)
    document.getElementById(elementId).innerHTML = "(" + priceInCurr.toFixed(decimals) + " " + currency.toUpperCase() + ")"
}


function updateCurrency() {
    let currency = document.getElementById("currency").value;
    localStorage.setItem("currency", currency);
    currencyCards();
}
