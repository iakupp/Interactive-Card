const cardHolder = document.getElementById("card-name");
const cardNumber = document.getElementById("card-number");
const expiry = Array.from(document.querySelectorAll(".expiry"));
const cvc = document.getElementById("cvc"); 
const submit = document.getElementById("submit");

const nameOnCard = document.querySelector(".person-name-diplay");
const numOnCard = document.querySelector(".card-number-display");
const cvcDisplay = document.querySelector(".card-cvc-display");
const expYY = document.querySelector(".expiry-year-display");
const expMM = document.querySelector(".expiry-month-display");

const thankYou = document.querySelector(".thank-you-header");
const thankYouSection = document.getElementById("thank-you");
const continueBtn = document.getElementById("continue");
const form = document.getElementById("myForm");
const expiryErrorMsg = document.getElementById("expiry-error");


function inputName(){
    nameOnCard.innerHTML = cardHolder.value;
    thankYou.innerHTML = "Thank you!";
    if(nameOnCard.innerHTML == ""){
        nameOnCard.innerHTML = cardHolder.placeholder;
    }
}

function inputCardNum(){
    let cardNumberInput = cardNumber.value;

    let formattedcardNumber = cardNumberInput.replace(/[^\d]/g, "") ;
    formattedcardNumber = formattedcardNumber.substring(0, 16);

    let cardNumberSections = formattedcardNumber.match(/\d{1,4}/g);
    if (cardNumberSections !== null){
        formattedcardNumber = cardNumberSections.join(" ");
    }
    if(cardNumberInput !== formattedcardNumber){
        cardNumber.value = formattedcardNumber;
    }
    numOnCard.innerHTML = cardNumber.value;
    if (cardNumber.value === ""){
        numOnCard.innerHTML = cardNumber.placeholder;
    }
}



function inputMM(){
    let formattedMM = expiry[0].value;
    formattedMM = formattedMM.substring(0,2);
    expiry[0].value = formattedMM;
    if (expiry[0].value === "" + "/"){
        expMM.innerHTML = "00" + "/";
    }else{
        expMM.innerHTML = expiry[0].value;
    }
}
function inputYY(){
    let formattedYY = expiry[1].value;
    formattedYY = formattedYY.substring(0,4);
    expiry[1].value = formattedYY;
    if (expiry[1].value === "/" +""){
        expYY.innerHTML = "/" + "00";
    }else{
        expYY.innerHTML = expiry[1].value;
    }
}
function inputCvc(){
    let formattedCvc = cvc.value;

    formattedCvc = formattedCvc.substring(0,3);
    cvc.value = formattedCvc;
    if (cvc.value === ""){
        cvcDisplay.innerHTML = "000";
    }else{
        cvcDisplay.innerHTML = cvc.value;
    }
}




function massValidate(){
    function ValidateName(){
        let cardHolderExp = /^[A-Z a-z]+$/;
        let errorMsg = document.getElementById("errorMsg");
        if (cardHolder.value.match(cardHolderExp)){
            errorMsg.textContent = "";
        }else{
            errorMsg.innerHTML = "Please enter cardholder name";
        }
    }
    function validateCard(){
        let cardNumError = document.getElementById("card-num-error");
        if(cardNumber.value.lenght > 0 && cardNumber.value.lenght <16){
            cardNumError.innerHTML = "Wrong format";
        }else if (cardNumber.value == ""){
            cardNumError.innerHTML = "Can´t be blank";
        }else{
            cardNumError.innerHTML = "";
        }
    }
    function validateExpiry(){
        let expMonth = /^(0[0-9]|1[1-2]){2}$/ ;
        let expYear = /^[0-9][0-2]{4}$/ ;

        if ( expiry[0].value.match(expMonth)){
            expiryErrorMsg.innerHTML = "";
        }else if (
            expiry[0].value.match(expMonth) &&
            expiry[1].value.match(expYear) 
        ){
            expiryErrorMsg.innerHTML = "";
        } else if (expiry[0] == ""){
            expiryErrorMsg.innerHTML = "";
        }else{
            expiryErrorMsg.innerHTML = "Can´t be blank";
        }
    }
    function validateCvc(){
        let cvcErrorMsg = document.getElementById("error-cvc");
        let cvcExp = /^[0-9]{3}$/;
        if (cvc.value === ""){
            cvcErrorMsg.innerHTML = "Can´t be blank";
        }else if(cvc.value.match(cvcExp)){
            cvcErrorMsg.innerHTML = "";
        }else{
            cvcErrorMsg.innerHTML = "Wrong format";
        }
    }
    ValidateName();
    validateCard();
    validateExpiry();
    validateCvc();
    if(
        nameOnCard.innerHTML == cardHolder.placeholder || 
        numOnCard.innerHTML == cardNumber.placeholder ||
        expMM.innerHTML == "00" ||
        expYY.innerHTML == "00" ||
        cvcDisplay.innerHTML == "000" ||
        (cardNumber.value.lenght > 0 && cardNumber.value.lenght <16)
    ){
        return false;
    }else{
        return true;
    }
    
}
//Submit button
submit.addEventListener("click", function() {
    massValidate();
    if(massValidate() == false){
        event.preventDefault();
    }else{
        event.preventDefault();

        form.style.display="none";
        thankYouSection.style.display="block";
    }
});

//Continue button
continueBtn.addEventListener("click", function(){
    event.preventDefault();
    thankYouSection.style.display="none";
    form.style.display="block";
    nameOnCard.innerHTML = cardHolder.placeholder;
    numOnCard.innerHTML = cardNumber.placeholder;
    expMM.innerHTML = "00";
    expYY.innerHTML = "00";
    cvcDisplay.innerHTML = "000";
    cardHolder.value = " ";
    cardNumber.value = " ";
    expiry[0].value = " ";
    expiry[1].value = " ";
    cvc.value = "";
    expiryErrorMsg.innerHTML = "";
});
