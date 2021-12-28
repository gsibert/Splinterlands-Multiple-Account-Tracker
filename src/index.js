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

   }

   //set currency
   if (localStorage.getItem("currency")) {
      document.getElementById("currency").value = localStorage.getItem("currency");
   } else {
      let defaultCurrency = document.getElementById("currency").value;
      localStorage.setItem("currency",defaultCurrency)
   }
}

function incomePage(){
   
   let usernames = [];
   let local = localStorage.getItem("accounts");
   if (local == null ) {
      
   } else {
      usernames.push(localStorage.getItem("accounts"));
      usernames = usernames.toString().split(",");
      (async () => {
         for (let user of usernames) {
           newRow = await createIncomeTable(user)
         }
       })();

   }

   //set currency
   if (localStorage.getItem("currency")) {
      document.getElementById("currency").value = localStorage.getItem("currency");
   } else {
      let defaultCurrency = document.getElementById("currency").value;
      localStorage.setItem("currency",defaultCurrency)
   }

}