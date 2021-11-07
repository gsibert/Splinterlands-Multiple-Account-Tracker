async function createTable(player) {
  var tbl = document.getElementById("jsonTable"), player, playerTable = "",
      api3 = 'https://game-api.splinterlands.io',
      api2 = 'https://api.splinterlands.io',
      api1 = 'https://api2.splinterlands.com',
      api = api1;

  await $.getJSON(`${api}/players/details?name=${player}`)
      .done(function(data){
        var username = data.name,
        ecr = parseFloat(parseFloat(data.capture_rate)/10000*100).toFixed(2),
        rank = league(data.league),
        rating = data.rating,
        power = data.collection_power;
        
        var row = tbl.insertRow(-1), 
        indexCell = row.insertCell(0),
        usernameCell = row.insertCell(1),
        ecrCell = row.insertCell(2),
        rankCell = row.insertCell(3),
        ratingCell = row.insertCell(4),
        powerCell = row.insertCell(5);

        usernameCell.innerHTML = username;
        ecrCell.innerHTML = ecr;
        rankCell.innerHTML = rank;
        ratingCell.innerHTML = rating;
        powerCell.innerHTML = power;

        $.getJSON(`${api}/players/balances?username=${player}`)
          .done(function(data_balances){
            var dec = 0,
                sps = 0,
                spsp = 0,
                credits = 0;
            
            try {
                  dec = data_balances.find(x => x.token === 'DEC').balance
            } catch {
              dec = 0
            }

            try {
                  sps = data_balances.find(x => x.token === 'SPS').balance;            
            } catch {
              sps = 0;
            }
            
            try {
                  spsp = data_balances.find(x => x.token === 'SPSP').balance
            } catch {
              spsp = 0
            }
            
            try {
                  credits = data_balances.find(x => x.token === 'CREDITS').balance
            } catch {
              credits = 0
            }

            var decCell = row.insertCell(6),
            spsCell = row.insertCell(7),
            spspCell = row.insertCell(8),
            creditsCell = row.insertCell(9);

            decCell.innerHTML = dec;
            spsCell.innerHTML = sps;
            spspCell.innerHTML = spsp;
            creditsCell.innerHTML = credits;
            
          });

        $.getJSON('https://api2.splinterlands.com/battle/history?player=' + player, function(data) {
            console.log('battle/history', data);    
            var winCount = 0,
            drawCount = 0,
            decEarned = 0;
            var dateTimeAgo = "",
            action = `<button  onclick = "deleteRow(this)">delete</button>`;
            for (var i = 0; i < data.battles.length; i++) {

                var win = data.battles[i].winner;
                    
                if(data.battles[i].winner == player){win = "!Winer!" + "[" + JSON.parse(data.battles[i].dec_info).reward.toFixed(2) + "DEC]"}
                if(data.battles[i].winner == player){ winCount++ }
                if(data.battles[i].winner == "DRAW"){ drawCount++ }
                if(data.battles[i].winner == player){ decEarned += parseFloat(JSON.parse(data.battles[i].dec_info).reward.toFixed(2)) }
                dateTimeAgo = moment(data.battles[0].created_date).fromNow();
            }
            console.log(player + " wins " + winCount + " times, and " + drawCount + " draws. " + player + "'s winrate is " + ((winCount/50)*100) + "%. Last Battle was " + dateTimeAgo)
            console.log(decEarned);
            var winRateCell = row.insertCell(10);
            lastBattleCell = row.insertCell(11);
            actionCell = row.insertCell(12);

            winRateCell.innerHTML = "W: " + winCount + " D: " + drawCount + " L: " + (50 - winCount - drawCount) + " \nWinRate: " + ((winCount/50)*100).toFixed(2) + "% " + "<p>" + decEarned.toFixed(2) + " \nDEC Earned</p>"
            lastBattleCell.innerHTML = dateTimeAgo;
            actionCell.innerHTML = action;
        });
      });
}


function deleteRow(r) {
  var i = r.parentNode.parentNode.rowIndex;
  var username = document.getElementById("jsonTable").rows[i].cells[1].innerHTML;
  //console.log(username);
  deleteLocalStorage(username);
  document.getElementById("jsonTable").deleteRow(i);
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