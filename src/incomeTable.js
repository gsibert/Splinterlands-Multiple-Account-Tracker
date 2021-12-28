var api3 = 'https://game-api.splinterlands.io',
    api2 = 'https://api.splinterlands.io',
    api1 = 'https://api2.splinterlands.com',
    api = api1;

async function createIncomeTable(player) {
    var tbl = document.getElementById("incomeTable");
    let cards = getCards(player);
    let decTransactions = getDecTransactions(player); 
    let rent = 0;
    let earned = 0;
    

    await Promise.all([cards, decTransactions]).then((data) => {
      let action = `<button class="w3-red" onclick = "deleteRow(this)">delete</button>`;
      let cards = data[0]["cards"]
      let rented = cards.filter(c=>c.market_listing_type === "RENT").map(x=>rent+=parseFloat(x.buy_price));
      addBalance(rent,"rent");
      console.log("Rent amount " + rent)
      
      let last24hrs = new Date(Date.now() - 86400000);
      let last24hrsRewards = data[1].filter(transaction => Date.parse(transaction.created_date) > last24hrs)
      let decTransactions =data[1].filter(transaction => transaction.type === "dec_reward").filter(transaction => Date.parse(transaction.created_date) > last24hrs)
      let earnings = decTransactions.map(x => earned += parseFloat(x.amount));
      addBalance(earned,"earned");
      console.log("Earned " + earned)
      addBalance((earned - rent),"net");

      var row = tbl.insertRow(-1),
      indexCell = row.insertCell(0),
      usernameCell = row.insertCell(1),
      earnedCell = row.insertCell(2),
      rentCell = row.insertCell(3),
      incomeCell = row.insertCell(4);
      //actionCell = row.insertCell(5);
      
      indexCell.innerHTML = '';
      usernameCell.innerHTML = player;
      earnedCell.innerHTML = earned.toFixed(3);
      rentCell.innerHTML = rent.toFixed(3);
      incomeCell.innerHTML = (earned - rent).toFixed(3);
      
      //actionCell.innerHTML = action;
      addBalance(1,"total-accounts");
      incomeCurrencyCards()

    }
    );
    
    
}