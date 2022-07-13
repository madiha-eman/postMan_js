console.log('PostMan 768');

// Utility functions:
// 1. Utility function to get DOM element from string
function getElementFromString(str){
    let div = document.createElement('div');
    div.innerHTML = str;
    return div.firstElementChild
};

// Initialize no of parameters
let addedParamCount = 0;

// hide the parameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";

// if the user click on json radio, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';

})

// if the user click on params radio, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display = 'block';
    document.getElementById('requestJsonBox').style.display = 'none';

})

// if the uers click on + button, add more params 
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let str = `<div class="form-row row g-3 my-3">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount +2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount +2}" placeholder="Parameter ${addedParamCount +2} Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount +2}" placeholder="Parameter ${addedParamCount +2} Value">
                </div>
                <button  class="btn btn-primary col-md-1 deleteBtn">-</button>
            </div>`;

            // Convert the element string to DOM node
            let paramElement = getElementFromString(str);
            params.appendChild(paramElement)
            console.log(paramElement)

          // Add an event listener to remove the parameter on clicking - button
            let deleteBtn = document.getElementsByClassName('deleteBtn');
            for(item of deleteBtn){
                    item.addEventListener('click', (e)=>{
                        let sevral = confirm('are you sure ?')
                        if(sevral == true){
                            e.target.parentElement.remove();
                            return true
                        }
                       else{
                        return false
                       } 
                       
                })
                }
            addedParamCount ++;

})

// If the user clicks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    // Show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = 'Please wait...fetching reponse';
    document.getElementById('responsePrism').innerHTML = 'Please wait...fetching reponse';

// Fetch all the values user has entered
    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
      
    // Log all the values in the console for debugging
    // console.log(url)
    // console.log(requestType)
    // console.log(contentType)

 // If user has used params option instead of json, collect all the parameters in an object
 if (contentType == 'params') {
    if(contentType == 'params'){
        data = {};
        for(let i=0; i<addedParamCount + 1; i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
            let key = document.getElementById('parameterKey' + (i+1)).value;
            let value = document.getElementById('parameterValue' + (i+1)).value;
            data[key] = value;

        }
    }
    data = JSON.stringify(data);
}
else{
    data = document.getElementById('requestJsonText').value
}
 }
// console.log(data);

if(requestType == 'GET'){
    fetch(url,{
        method : 'GET'
    })
    .then(response => response.text())
    .then((text) =>{
//  document.getElementById('responseJsonText').value = text;
 document.getElementById('responsePrism').innerHTML = text;
 Prism.highlightAll();


    })
}
else{
    fetch(url,{
        method : 'POST',
        body: data,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }, 
    })
    .then(response => response.text())
    .then((text) =>{
    //  document.getElementById('responseJsonText').value = text;
    document.getElementById('responsePrism').innerHTML = text;
    Prism.highlightAll();


    })
}
})
