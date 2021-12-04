function main(){
   
   let usernames = [];
   let local = localStorage.getItem("accounts");
   if (local == null ) {
      
   } else {
      usernames.push(localStorage.getItem("accounts"));
      usernames = usernames.toString().split(",");
      for (let i = 0; i < usernames.length; i++) {
         createTable(usernames[i]);
      }
      setTimeout(function(){ currencyCards() }, 5000);
   }

   //set currency
   if (localStorage.getItem("currency")) {
      document.getElementById("currency").value = localStorage.getItem("currency");
   } else {
      let defaultCurrency = document.getElementById("currency").value;
      localStorage.setItem("currency",defaultCurrency)
   }
   /*
   let usernames = [];
   usernames.push(localStorage.getItem("accounts"));
   usernames = usernames.toString().split(",");
   for (let i = 0; i < usernames.length; i++) {
      console.log(usernames[i])
   }*/

}

 /*To do:
  *https://www.codegrepper.com/code-examples/javascript/add+array+to+localstorage
  *create an array in username, append it with every correct username and loop thru that username array for persistent data
  *cards for DEC SPS Staked SPS
  *Win rate from the last 50 battles
  */    
