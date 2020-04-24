//var apiURL = "https://games-world.herokuapp.com";
var apiURL = "https://games-app-siit.herokuapp.com";

function getGamesList() {
    return fetch(apiURL + "/games",{
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        console.log(response);
        return response.json();
    })
    // .catch(function(error){
    //     console.log('An error has occured:', error);
    // });
   
}

function deleteGame(gameID) {
    return fetch(apiURL + "/games/"+ gameID,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.text();
    })
    // .catch(function(error){
    //     console.log('An error has occured:', error);
    // });

}

function createGameRequest(gameObject) {
    return fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: gameObject
    }).then(function(response){
        return response.json();
    })
    // .catch(function(error){
    //     console.log('An error has occured:', error);
    // });
}

function updateGameRequest(gameId, updateGameObj) {
    return fetch(apiURL + `/games/${gameId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: updateGameObj
    }).then(function(response){
        return response.json();
    })
    // .catch(function(error){
    //     console.log('An error has occured:', error);
    // });
}