//https://api.steemmonsters.io/players/history?username=
//no longer in use
function getPlayerData(url, callback) {

    $.get(url, function(data){
      callback(data);

    });
}

function getPlayerBalance(url, callback) {

    $.get(url, function(data){
      callback(data);
    });
   
}

