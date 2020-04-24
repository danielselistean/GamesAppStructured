// Afiseaza lista de jocuri

    getGamesList().then(function(arrayOfGames){
      console.log(arrayOfGames);
        for(let i = 0; i < arrayOfGames.length; i++) {
            createDomElement(arrayOfGames[i]);
        };
    });


  //Afiseaza in DOM jocul nou creat
  function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", gameObj._id);
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p>
                        <button class="delete-btn" id="${gameObj._id}">Delete</button>
                        <button class="update-btn" id="${gameObj._id}">Edit Game</button>`; 

    const updateGameElement = document.createElement("div");
    updateGameElement.innerHTML = `<form class="updateForm">
                                  <label for="gameTitle">Title *</label>
                                  <input type="text" value="" name="gameTitle" id="updateGameTitle"/>
                                  <label for="gameDescription">Description</label>
                                  <textarea name="gameDescription" id="updateGameDescription"></textarea>
                                  <label for="gameImageUrl">Image URL *</label>
                                  <input type="text" name="gameImageUrl" id="updateGameImageUrl"/>
                                  <button class="updateBtn">Save Changes</button>
                                  <button class="cancelBtn">Cancel</button>
                               </form>`;   
                
     
    function newDomElement(gameELement){
      const updateGameTitle = document.getElementById("updateGameTitle").value;
      const updateGameDescription = document.getElementById("updateGameDescription").value;
      const updateGameImageUrl = document.getElementById("updateGameImageUrl").value;
      gameELement.querySelector('h1').innerHTML = updateGameTitle;
      gameELement.querySelector('p').innerHTML = updateGameDescription;
      gameELement.querySelector('img').src = updateGameImageUrl;
  
  
        var urlencoded = new URLSearchParams();
    
        urlencoded.append("title", updateGameTitle);
        urlencoded.append("imageUrl", updateGameImageUrl);
        urlencoded.append("description", updateGameDescription);
    
        updateGameRequest(urlencoded, newDomElement);

        document.querySelector(".updateForm").reset()
    }                                        
                        

    container1.appendChild(gameELement);

 
    //Formul pentru update-ul jocului pus intr-un div pentru a fi atasat div-ului 'gameElement' prin butonul Edit Game;
  

    //console.log(gameELement);
  
    // Se creaza functionalitate pe butoanele de Delete respectiv Edit(Update);
    
   document.getElementById(`${gameObj._id}`).addEventListener("click", function(event){
    if (event.target.classList.contains('delete-btn')){
  
          deleteGame(event.target.getAttribute("id")).then(removeDeletedElementFromDOM(event.target.parentElement));
    } else if(event.target.classList.contains('update-btn')){
  
        gameELement.appendChild(updateGameElement);

    }else if(event.target.classList.contains('cancelBtn')){
        removeDeletedElementFromDOM(updateGameElement);

    }else if(event.target.classList.contains('updateBtn')){
        newDomElement(gameELement);
        console.log(gameELement);
        removeDeletedElementFromDOM(updateGameElement);
    }
  
  });
}
  
  //functia pentru stergerea elementului din DOM;
  function removeDeletedElementFromDOM(domElement){
    domElement.remove();
  }
  
  function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
  }
  
  function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
  }
  
  function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
  }
  
  //Adaugam functionalitate pe butonul de submit;
  
  document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();
  
    //colectam datele din Form (create form);
    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");
  
    //Validam elemenntele care sunt obligatorii(required *);
    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");
  
    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");
  
    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        // Daca totul este valid, encodam parametrii pentru  a fi trimisi in request catre Api
        const urlencoded = new URLSearchParams();

        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);
  
        // facem requestul si folosim raspunsul la afisarea jocului
        // createGameRequest(urlencoded, createDomElement);
        createGameRequest(urlencoded).then(createDomElement);
    }
    // Resetam form-ul , golind inputurile, dupa "succes form submit" ;
    clearInputs();
  })
  
  function clearInputs() {
    document.querySelector(".creationForm").reset()
  }