function main(){
   
   let usernames = [];
   let local = localStorage.getItem("accounts");

   if (local == null ) {
      
   } else {
      usernames.push(localStorage.getItem("accounts"));
      usernames = usernames.toString().split(",");
      /*(async () => {
         for (let user of usernames) {
            newRow = await createTable(user, -1)
         }
       })();*/
       (async () => {
         for (let user of usernames) {
            try {
               newRow = await createTable(user, -1)
            } catch (e) {
               console.log("There was an error while processing " + user + "\n" + e)
               document.getElementsByClassName("message")[0].style.display = "block";
               document.getElementById("error-message").innerHTML += "<br>There was an error while processing " + user + " | " + e
            }
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
            try {
               newRow = await createIncomeTable(user)
            } catch (e) {
               console.log("There was an error while processing " + user + "\n" + e)
               document.getElementsByClassName("message")[0].style.display = "block";
               document.getElementById("error-message").innerHTML += "<br>There was an error while processing " + user + " | " + e
            }
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