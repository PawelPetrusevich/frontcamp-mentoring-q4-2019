let instance = null;

export default class ErrorHandlerPopUp {

    constructor(){
        if(!instance){
            instance = this;
        }

        return instance;
    }

    open = function(err,params) {
        var modal = document.getElementById("errorModal");
        var errorMessageContainer = document.getElementById("errorMessage");
        errorMessageContainer.innerHTML = err.message;
        initializePopUp(params);
        modal.style.display = "block";
    }
}

function initializePopUp(parameter) {
    var modal = document.getElementById("errorModal");
    var closeButton = document.getElementById("errorPopUpCloseBtn");
    window.onclick = function (event) {
        if(event.target == modal){
            modal.style.display = "none";
        }
    }

    if (parameter) {
        if(parameter.time) {
            setTimeout(() => {
                modal.style.display = "none";
            }, parameter.time);
        }
    }    
}