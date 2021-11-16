function league(rank) {
    switch(rank) {
        case 0:
          rank = "Novice";
          break;
        case 1:
          rank = "Bronze 3";
          break;
        case 2:
          rank = "Bronze 2";
          break;
        case 3:
          rank = "Bronze 1";
          break;
        case 4:
          rank = "Silver 3";
          break;
        case 5:
          rank = "Silver 2";
          break;
        case 6:
          rank = "Silver 1";
          break;
        case 7:
          rank = "Gold 3";
          break;
        case 8:
          rank = "Gold 2";
          break;
        case 9:
          rank = "Gold 1";
          break;
        case 10:
          rank = "Diamond 3";
          break;
        case 11:
          rank = "Diamond 2";
          break;
        case 12:
          rank = "Diamond 1";
          break;
        case 13:
          rank = "Champion 3";
          break;
        case 14:
          rank = "Champion 2";
          break;
        case 15:
          rank = "Champion 1";
      };
      return rank;
}

function lastTeam(team) {
  switch(team) {
      case "Red":
        team = "Fire";
        break;
      case "Blue":
        team = "Water";
        break;
      case "Green":
        team = "Earth";
        break;
      case "White":
        team = "Life";
        break;
      case "Black":
        team = "Death";
        break;
      case "Gold":
        team = "Dragon";
    };
    return team;
}
