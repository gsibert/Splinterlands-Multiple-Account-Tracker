var api3 = 'https://game-api.splinterlands.io',
    api2 = 'https://api.splinterlands.io',
    api1 = 'https://api2.splinterlands.com',
    api = api1;

async function createTable(player) {
    var tbl = document.getElementById("jsonTable");
    let playerBattleHistory = getBattleHistory(player);
    let playerData = getPlayerData(player);
    let playerBalance = getPlayerBalance(player); 

    await Promise.all([playerData, playerBalance, playerBattleHistory]).then((data) => {
      //let's do the magic here
      
      //player data
      var username = data[0].name, 
      rank = league(data[0].league),
      rating = data[0].rating,
      power = data[0].collection_power;

      var lastCaptureRate = data[1].find(x => x.token === "ECR").balance, 
          lastRewardTime = new Date(data[1].find(x => x.token === "ECR").last_reward_time);
      //let ecr = lastCaptureRate + ((new Date($.now()).getTime() - lastRewardTime.getTime())/1000 * 0.02893519);
      //ecr = (Math.min(ecr, 10000) / 100).toFixed(2);
      let ecr = (calculateECR(lastCaptureRate, lastRewardTime)/100).toFixed(2);

      //player balance
      try {
        dec = data[1].find(x => x.token === 'DEC').balance
      } catch {
        dec = 0
      }

      try {
            sps = data[1].find(x => x.token === 'SPS').balance;            
      } catch {
        sps = 0;
      }
      
      try {
            spsp = data[1].find(x => x.token === 'SPSP').balance
      } catch {
        spsp = 0
      }
      
      try {
            credits = data[1].find(x => x.token === 'CREDITS').balance
      } catch {
        credits = 0
      }

      //player battle history
      var winCount = 0,
      drawCount = 0,
      decEarned = 0;
      var dateTimeAgo = "",
      action = `<button class="w3-red" onclick = "deleteRow(this)">delete</button>`,
      team = "", wl= "";
      
      //this is to the if the you did not select a team
      try {
        if(data[2].battles[0].winner == player){ wl = "WIN <br><span style='color:blue'>" + 
        parseFloat(JSON.parse(data[2].battles[0].reward_dec).toFixed(2)) + " DEC</span>" } else { if(data[2].battles[0].winner != player || data[2].battles[0].winner != "DRAW") { wl = "LOSE" } }
        if(data[2].battles[0].winner == "DRAW"){ wl = "DRAW" }
      } catch (e) {
        setTimeout(function() {
          if(data[2].battles[0].winner == player){ wl = "WIN <br><span style='color:blue'>" + 
          parseFloat(JSON.parse(data[2].battles[0].reward_dec).toFixed(2)) + " DEC</span>" } else { if(data[2].battles[0].winner != player || data[2].battles[0].winner != "DRAW") { wl = "LOSE" } }
          if(data[2].battles[0].winner == "DRAW"){ wl = "DRAW" }
        }, 1000)
      }
      
      try {
        //console.log(JSON.parse(data[2].battles[i].details).team1.player)
        if(JSON.parse(data[2].battles[0].details).team1.player == player){
          team = lastTeam(JSON.parse(data[2].battles[0].details).team1.color) + " - " + wl        
        } else {
          team = lastTeam(JSON.parse(data[2].battles[0].details).team2.color) + " - " + wl
        }
      } catch (e) {
        console.log(e)
        try {
          if(data[2].battles[0].winner == player){
            team = "The enemy did not pick a team <br>or surrendered - " + wl ;
          } else {
            team = "You did not pick a team <br>or you surrendered - LOSE";
          }
        } catch (e) {
          console.log(e);
          if(JSON.parse(data[2].battles[0].details).winner == player) {
            team = "The enemy did not pick a team <br>or surrendered";
          } else {
            team = "You did not pick a team <br>or you surrendered";
          }
        }        
      }
      
      for (var i = 0; i < data[2].battles.length; i++) {

          //var win = data[2].battles[i].winner;
          try {
          
          if(data[2].battles[i].winner == player){ winCount++; wl = "WIN" } else { if(data[2].battles[i].winner != player || data[2].battles[i].winner != "DRAW") { wl = "LOSE" } }
          if(data[2].battles[i].winner == "DRAW"){ drawCount++; wl = "DRAW" }
          
          } catch (e) {
            console.log(e);
            setTimeout(function() {
            if(data[2].battles[i].winner == player){ winCount++; wl = "WIN" } else { if(data[2].battles[i].winner != player || data[2].battles[i].winner != "DRAW") { wl = "LOSE" } }
            if(data[2].battles[i].winner == "DRAW"){ drawCount++; wl = "DRAW" } }, 1000)
          }



          try {
            if(data[2].battles[i].winner == player){ decEarned += parseFloat(JSON.parse(data[2].battles[i].reward_dec).toFixed(2))}
          } catch (e) {
              console.log(e)     
          }
            dateTimeAgo = moment(data[2].battles[0].created_date).fromNow();
      }
     
      var row = tbl.insertRow(-1), 
        indexCell = row.insertCell(0),
        usernameCell = row.insertCell(1),
        ecrCell = row.insertCell(2),
        rankCell = row.insertCell(3),
        ratingCell = row.insertCell(4),
        powerCell = row.insertCell(5),
        decCell = row.insertCell(6),
        spsCell = row.insertCell(7),
        spspCell = row.insertCell(8),
        lastTeamCell = row.insertCell(9);

        indexCell.innerHTML = '';
        usernameCell.innerHTML = username;
        ecrCell.innerHTML = ecr + "%";
        rankCell.innerHTML = rank;
        ratingCell.innerHTML = rating;
        powerCell.innerHTML = power;
        decCell.innerHTML = dec;
        addBalance(dec,"dec");
        spsCell.innerHTML = sps;
        addBalance(sps,"sps");
        spspCell.innerHTML = spsp;
        addBalance(spsp,"spsp");
        lastTeamCell.innerHTML = team;
      
      try {
        winRateCell = row.insertCell(10);
        lastBattleCell = row.insertCell(11);
        actionCell = row.insertCell(12);

        winRateCell.innerHTML = "W: " + winCount + " D: " + drawCount + " L: " + (50 - winCount - drawCount) + " <br>WinRate: " + ((winCount/50)*100).toFixed(2) + "% " + "<br><span style='color:blue'>" + decEarned.toFixed(2) + " \nDEC Earned</span>"
        lastBattleCell.innerHTML = dateTimeAgo;
        actionCell.innerHTML = action;
      } catch {
        console.log("!!!!there was error with the initial excution waiting for 1 sec to try again!!!")
        setTimeout(function(){
          winRateCell = row.insertCell(10);
          lastBattleCell = row.insertCell(11);
          actionCell = row.insertCell(12);

          winRateCell.innerHTML = "W: " + winCount + " D: " + drawCount + " L: " + (50 - winCount - drawCount) + " \nWinRate: " + ((winCount/50)*100).toFixed(2) + "% " + "<p>" + decEarned.toFixed(2) + " \nDEC Earned</p>"
          lastBattleCell.innerHTML = dateTimeAgo;
          actionCell.innerHTML = action;
        }, 1000 );
      }
      addBalance(1,"total-accounts")
      currencyCards()        
    });
    
}


function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  var username = document.getElementById("jsonTable").rows[i].cells[1].innerHTML;
  var dec = document.getElementById("jsonTable").rows[i].cells[6].innerHTML;
  var sps = document.getElementById("jsonTable").rows[i].cells[7].innerHTML;
  var spsp = document.getElementById("jsonTable").rows[i].cells[8].innerHTML;
  deleteBalance(dec,"dec");
  deleteBalance(sps,"sps");
  deleteBalance(spsp,"spsp");
  deleteBalance(1,"total-accounts");

  //console.log(username);
  deleteLocalStorage(username);
  document.getElementById("jsonTable").deleteRow(i);
  setTimeout(currencyCards(), 5000);
}


function sortTableNumber(n) {
  var table, rows, switching, i, x, y, dir, switchcount = 0, shouldSwitch;
  table = document.getElementById("jsonTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
          if (Number(x.innerHTML) < Number(y.innerHTML)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  console.log("switching done")
}


function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("jsonTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


function calculateECR(capture_rate, last_reward_time) {
  return Math.min((isNaN(parseInt(capture_rate)) ? 10000 : capture_rate) + (Date.now() - new Date(last_reward_time)) / 3000 * 0.0868, 10000)
}