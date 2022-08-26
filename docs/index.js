const form   = document.querySelector('.form');

const validate = {
    name: /^[a-zA-Záéíóú]{3,10}\s[a-zA-Záéíóú]{4,10}$/,
    numbers: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
    expireMonth: /^\d{1,2}$/,
    expireYear: /^\d{4}$/,
    cvc: /^\d{3}$/
}

const checkValidation = {
    name : false,
    numbers : false,
    mo : false,
    ye : false,
    cvc : false
}

const validateForm = (value,e,nameTarget,validate,card) =>{
   let message = document.querySelector(`#field-${nameTarget} .err-message`);

   if(validate.test(value)){
        message.style = 'display: none;';
        e.style = 'margin-bottom: 15px;';
        checkValidation[card] = true;
   }
   else{   
        message.style = 'display: block;';
        e.style = 'margin-bottom: 0';
        checkValidation[card] = false;
   }  
   document.querySelector(`.card-${card}`).textContent = value;
}

form.addEventListener('click',e =>{
    if(e.target.tagName == 'INPUT'){
        e.target.addEventListener('keyup',(e)=>{
            let nameTarget = e.target.name;

            if(nameTarget == 'name') validateForm(e.target.value, e.target, nameTarget,validate.name, 'name');
            else if(nameTarget == 'number') validateForm(e.target.value, e.target, nameTarget, validate.numbers, 'numbers');
            else if(nameTarget == 'month') validateForm(e.target.value, e.target, 'exp', validate.expireMonth,'mo');
            else if(nameTarget == 'year') validateForm(e.target.value, e.target, 'exp', validate.expireYear, 'ye');
            else if(nameTarget == 'cvc') validateForm(e.target.value, e.target, nameTarget, validate.cvc, 'cvc');
        });
    }else if(e.target.tagName == 'BUTTON'){
        e.preventDefault(); 
        if(checkValidation.name && checkValidation.numbers && checkValidation.mo && checkValidation.ye && checkValidation.cvc){
            document.querySelector('.form').classList.add('form-active');
            document.querySelector('.valid-form').classList.add('valid-form_active');
            document.querySelector('.form-content').style = 'display: none';
            setTimeout(()=> document.querySelector('.valid-form_active').style = 'transform: scale(1)', 100);
            
        }else alert('please complete the form correctly');
    }
});