window.onload=function(){
    //assign var
    document.getElementById('formone').addEventListener('focusin', (e) => { myFocusFn(e) } )
    document.getElementById('formone').addEventListener('focusout', myBlurFn)
    document.getElementById('formone').addEventListener('keyup', myClickFn)
    document.querySelector('.addprofile').addEventListener('click', addProfile, true)
    let formtwoEl = document.getElementById('formtwo');
    formtwoEl.addEventListener('keyup', sameAsClickFn)

    let formthreeEl = document.getElementById('formtwo')
    formthreeEl.addEventListener('keyup', myClickFn)

    let formfourEl = document.getElementById('formfour')
    formfourEl.addEventListener('keyup', myClickFn)
    let smArr = [];
 

    //show alert msg
    function myFocusFn(e) {
        //console.log(e)
        e.preventDefault();
        let childEl = document.getElementById(e.target.id);
        let NextSibling = childEl.nextElementSibling.id;
        let alertText = document.getElementById(NextSibling);
        alertText.classList.add("afterfocus")
    } 

    //hide alert msg 
    function myBlurFn(e){
        e.preventDefault();
        let childEl = document.getElementById(e.target.id);
        let NextSibling = childEl.nextElementSibling.id;
        let alertMsg = document.getElementById(NextSibling);
        alertMsg.classList.remove("afterfocus");
    }

    //
    function myClickFn(e){
        //console.log('e')
        let childEl = document.getElementById(e.target.id)
        const valueEl = document.getElementById(e.target.id).value;
        //console.log(valueEl)
        const createIdElement = (childEl.id + 'str').toString();
        //console.log(createIdElement)

       document.getElementById(`${createIdElement}`).textContent =  '\"' + valueEl + '\"';
    }

    function addProfile(e) {
        e.preventDefault();
        let inputId = e.target.id;
        let valuesArr = smArr.map(x => Object.values(x)[0]);

        //disable the sm button after one click
        document.getElementById(`${inputId}`).disabled=true;
        

        //array to create sameAs div on the schema
        smArr.push({[`${inputId}`]: ''});

        
        //console.log(smArr)
        if (smArr.length === 1){
            addSameAsProp();
        }
        if(smArr.length > 1 && !valuesArr[0] ){
            addSameAsArr();
        } else if(smArr.length > 1 && valuesArr[0]){
            console.log(valuesArr[0])
            addSameAsPropVal(e);
        }

        
        //create input for social media
        let input = document.createElement("input")
        input.setAttribute('type', 'text')
        input.setAttribute('id', `${inputId}id` )
        input.setAttribute('placeholder', `${inputId}`)
        input.setAttribute('class', 'smedialink form-control')

        //create delete btn 
        let delBtn = document.createElement('button')
        delBtn.setAttribute('id', `delbtn ${inputId}`)
        delBtn.addEventListener('click', (e) => { e.preventDefault(); deleteSocialMediaEl(e) }, false)
        delBtn.innerHTML= 'X';


        //Append
        let parent = document.querySelector('.smedia')
        parent.appendChild(input)
        parent.appendChild(delBtn)

        //delete social media
        function deleteSocialMediaEl(e){
            let idEl = e.target.id;
            e.stopPropagation();
            e.preventDefault();

            //remove delete and its sibling sm
            document.getElementById(idEl).previousElementSibling.remove();
            document.getElementById(idEl).remove();

            //filter the deleted sm from array   
            let unshiftEl = idEl.trim().split(' ')
            //console.log(unshiftEl)
            let indexEl = smArr.indexOf(unshiftEl[1])
            smArr.splice(indexEl, 1)
            //console.log(smArr)

        }  
    }

    //add sameAs Click fn to add value to the schema
    function sameAsClickFn(e){
        //console.log(smArr)
        let objKey = e.target.placeholder;
        const valueEl = document.getElementById(e.target.id).value;
        smArr.map(x => {
            if ( Object.keys(x)[0] === objKey){
               x[`${objKey}`] = valueEl;
            }
            //console.log(x)
        });
        
        //for a single sameAs 
        if(smArr.length === 1){
            //get the id from the schema sameAs property value
        let sameAsStrId = (e.target.id+'str').toString();
        let childEl = document.getElementById(sameAsStrId)     
        childEl.textContent =  '\"' + valueEl + '\"';
        }

        //for array of sameAs
        if(smArr.length > 1 ){
            let printArray = smArr.map(x => Object.values(x)[0]);
            let sameAsId = (e.target.id).toString();
            //console.log(sameAsId)
                let childEl = document.querySelector(`.${sameAsId}`)
            console.log(`${sameAsId}`)
            childEl.textContent =  '\"' + valueEl + '\"';
        }
        
    }  

    function addSameAsProp(){
        let idKey = smArr.map(x => Object.keys(x)[0]);
        let postalAddressProp = document.getElementById('postaadd');
        postalAddressProp.insertAdjacentHTML("afterend",
                `
                <div id='sameas'>
                <span class="str">"sameAs"</span>
                <span class="pun">:</span>
                <span class='pln'> </span>
                <span id="${idKey}idstr">" "</span>
                </div><br>`);
  
    }

    function addSameAsArr(){
        //remove child el when sameAs array length more than 1
        let parentEl = document.getElementById('sameas')
        removeAllChildNodes(parentEl)
        parentEl.remove()

        //get the key array
        let idKey = smArr.map(x => Object.keys(x)[0]);
        console.log(idKey)

        let postalAddressProp = document.getElementById('postaadd');
        postalAddressProp.insertAdjacentHTML("afterend",
                `<div id='sameas'> 
                <span class="str">"sameAs"</span>
                <span class="pun">:</span>
                <span class='pln'> </span>
                <span id="arr">[</span><br>
                <div id="sameArr">` +
                idKey.map( x => {
                   return `&nbsp&nbsp<span class="${x}id">" "</span><br>`
                }) +
                `</div>
                <span>]</span><br>
                </div><br>`); 
    }

    function addSameAsPropVal(e){
        console.log('i am checked')
        let idKey = smArr.map(x => Object.keys(x)[0]);

        let id = e.target.id;
        let spanEl = document.createElement('span')
        spanEl.setAttribute('class', `${id}id` )
        spanEl.textContent= '\"' + ' ' + '\"';

        let div = document.getElementById('sameArr') 
        div.appendChild(spanEl)

    }

    //removing child nodes 
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}




 

