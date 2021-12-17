function main(){
   
   let usernames = [];
   let local = localStorage.getItem("accounts");
   if (local == null ) {
      
   } else {
      usernames.push(localStorage.getItem("accounts"));
      usernames = usernames.toString().split(",");
      (async () => {
         for (let user of usernames) {
           newRow = await createTable(user, -1)
         }
       })();
      setTimeout(function(){ currencyCards() }, 3000);
   }

   //set currency
   if (localStorage.getItem("currency")) {
      document.getElementById("currency").value = localStorage.getItem("currency");
   } else {
      let defaultCurrency = document.getElementById("currency").value;
      localStorage.setItem("currency",defaultCurrency)
   }
}