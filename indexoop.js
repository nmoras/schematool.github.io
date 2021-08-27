"use strict";

(function() {
    document.addEventListener('DOMContentLoaded', function(){
        //const schema = new Schema();
    });

    class Schema {
        constructor() {

        }

        events = function(){

        }
    }

    Schema.prototype.myClickFn = function(e) {
        let childEl = e.target.id
        const valueEl = document.getElementById(e.target.id).value;
        const createIdElement = (childEl + 'str').toString();
    
    document.getElementById(`${createIdElement}`).textContent =  '\"' + valueEl + '\"';
    document.getElementById(`${createIdElement}`).style.background = 'purple';

    };

    Schema.prototype.myTestFn = function (e){
        e.preventDefault();
        let btnAddEl = document.querySelector('.btnAdd')

        if( btnAddEl.textContent === 'Edit'){
            document.getElementById('tsma').disabled = false;
            btnAddEl.textContent = 'Add';

        } else {

            let sameArrEl = document.getElementById('sameas')

            //everytime add is clicked delete the printed array, print the new array
            if(sameArrEl){
                sameArrEl.remove();
            }
            
            //add edit once the array is submitted
            btnAddEl.textContent = 'Edit';

            //disable the textarea once the array is added
            document.getElementById('tsma').disabled = true;

            let textEl = sameAsEl.value.split(/\r|\n/);

            let postalAddressProp = document.getElementById('postAdd');
            postalAddressProp.insertAdjacentHTML("afterend",
                    `<div id='sameas'> 
                    <span class="str">"sameAs"</span>
                    <span class="pun">:</span>
                    <span class='pln'> </span>
                    <span id="arr">[</span><br>
                    <div id="sameArr">` +
                    textEl.map( function(x, id){
                        if( (textEl.length-1) === id){
                            return `&emsp;&emsp;<span>"${x}"</span><br>`
                        } else {
                            return `&emsp;&emsp;<span>"${x}",</span><br>`
                        }        
                    }).join('') +
                    `</div>
                    <span>],</span><br>
                    </div>`);      
                }        
    };

    Schema.prototype.addDateFn = function(e){
        e.preventDefault();

        //this gets created 
        let dateArrEl = document.getElementById('dateArr')

        //delete the printed hour array from schema section
        if(dateArrEl){
            dateArrEl.remove();
        }

        let textEl = hoursEl.value.split(/\r|\n/);
        console.log(textEl)

            let postalAddressProp = document.getElementById('hasmapSchema');
            postalAddressProp.insertAdjacentHTML("afterend",
                    `<div id='dateArr'> 
                    <span class="str">"openingHours"</span>
                    <span class="pun">:</span>
                    <span class='pln'> </span>
                    <span id="arr">[</span><br>
                    <div id="sameArr">` +
                    textEl.map( function(x, id){
                        if( (textEl.length-1) === id && x){
                            return `&emsp;&emsp;<span>"${x}"</span><br>`
                        } else if(x)
                        {
                            return `&emsp;&emsp;<span>"${x}",</span><br>`
                        }        
                    }).join('') +
                    `</div>
                    <span>],</span><br>
                    </div>`);  
    };

    Schema.prototype.removeAllChildNodes = function (parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

})();