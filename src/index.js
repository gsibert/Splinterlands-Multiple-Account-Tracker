function main(){
   /* This is working for local run only
   $.getJSON('src/users.json').done(function(data){ 
      
      for (var i = 0; i < data.length; i++) {
         var index = i + 1 
         createTable( data[i], index );
         console.log(index)
      }      
   }); */

   //getWinRate("dadee");

   let nextValue;
   for (let i = 0; i < localStorage.length; i++){
      nextValue = localStorage.getItem(localStorage.key(i));
      createTable(nextValue);
}
   
 
}

 /*To do:
  *https://www.codegrepper.com/code-examples/javascript/add+array+to+localstorage
  *create an array in username, append it with every correct username and loop thru that username array for persistent data
  *cards for DEC SPS Staked SPS
  *Win rate from the last 50 battles
  */    
