//var apiURL = "https://games-world.herokuapp.com";
var apiURL = "https://games-app-siit.herokuapp.com";

  async function getGamesList(){
    const response = await  fetch(apiURL + "/games", {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            console.log(response);
    const arrayOfGames = await response.json();
        return arrayOfGames;

}


async function deleteGame(gameID){
  const response = await  fetch(apiURL + "/games/" + gameID, {
               method: "DELETE",
               headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
        console.log(response);

  const apiresponse = await response.text();
  console.log(apiresponse);
    return apiresponse;
}


async function createGameRequest(gameObject){

  const response = await fetch(apiURL + "/games", {
              method: "POST",
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
              },
              body: gameObject
          });

  const createdGame = await response.json();
  console.log(createdGame);
    return createdGame;
}


async function updateGameRequest(gameID, updatedGameObject){
    const response = await fetch(apiURL + "/games/" + gameID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObject
});

    const updatedGame = await response.json();
    console.log(updatedGame);
        return updatedGame;
}
