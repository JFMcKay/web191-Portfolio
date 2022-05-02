// Element selector helper written after all the code will update as I get the chance.

const selectElement = selector => {
  const element = document.querySelector(selector);
  if(element) return element;
  throw new Error(`${selector} I can't find it.`);
}

// removes active class from all active classes.
const removeClass = (selector) => {
  let activeEl = selectElement(selector);
  // Could pass a variable but you need to remove the . in the .active using substring 
  let fixedClass = selector.substring(1);
  console.log(selector + " changed to " + fixedClass);
  activeEl.classList.remove(fixedClass);
}
const scrollSection = () => {
  // If menu is clicked add active.
  let menuSection = document.querySelectorAll('.nav-link');
// for clickable event
menuSection.forEach(v=> {
  v.onclick = (()=> {
    // If menu is click make sure area-expanded=false
    let toggler = document.getElementById("navbarNavDropdown");
    toggler.classList.remove('show');
  setTimeout(()=> {
      menuSection.forEach(j=> j.classList.remove('active'))
    v.classList.add('active')
  },300)
  })
})

  let mainSection = document.querySelectorAll('main section');
  mainSection.forEach((v,i)=> {
    let rect = v.getBoundingClientRect().y
    if(rect < window.innerHeight-200){
      menuSection.forEach(v=> v.classList.remove('active'))
      menuSection[i].classList.add('active')
    }
  })
}

// selected elements
const mybutton = selectElement("#btn-back-to-top");
// Called when scrolling could probably call on menu click as well
const scrollFunction = () => {

  // Code to set if the screen is scrolled from the top
  if (document.body.scrollTop > 15 || 
      document.documentElement.scrollTop > 15) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click",() => backToTop());

const backToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//Validate function
const validateMe = () => {
  // Variables for better readability
  let formLength = document.forms[0].elements.length;
  for (var i=0;i<formLength;i++){
      let errorarea = document.forms[0].elements[i].name + "_error";
      let msg = document.forms[0].elements[i].name;
      if(msg == 'email') {
        //Checks if email format is correct
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.forms[0].elements[i].value)) {
          document.getElementById(errorarea).innerHTML = 'Please enter a proper ' + msg + ' like jj@gmail.com';
          return false;
          }
        }
          if (document.forms[0].elements[i].value == ''){
              document.getElementById(errorarea).innerHTML = 'Please enter your ' + msg;
              // moved to css
              // document.getElementById(errorarea).style.color = '#ff0000'; 
              document.forms[0].elements[i].focus();
              return false;
          } else {
              document.getElementById(errorarea).innerHTML= '';      
          }
          // Checks for checkbox or radio elements and loops through them to validate.
          let elemChecked = false;
              if (document.forms[0].elements[i].type == 'radio' || document.forms[0].elements[i].type == 'checkbox') {
                  const elemNum = document.getElementsByName(msg).length;
                  let elem = document.getElementsByName(msg);
                  for (var j=0; j < elemNum; j++) {
                      if (elem[j].checked == true)
                      {
                          elemChecked = true;
                      }
                  }
                  if (elemChecked == false) {
                  document.getElementById(errorarea).innerHTML= 'Please enter your ' + msg;
                  // moved to css
                  // document.getElementById(errorarea).style.color = '#ff0000'; 
                  return false;
              }
          }
      }
      return true;
  }      
// reset all the fields in the form with the ID js-form
  let clearFields = () => {
    document.getElementById("js-form").reset();
  }

  document.getElementById("form-submit").addEventListener("click", function(event) {
    event.preventDefault();
    if (validateMe()) {
      emailjs.sendForm('service_uta9z8b', 'template_yisvm6i', '#js-form')
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      document.getElementById("button_msg").style.display = "block"; 
      setTimeout(function(){
        document.getElementById("button_msg").style.display = "none";
    }, 6000);
      
      clearFields();
    }, function(error) {
      console.log('FAILED... sending email through EmailJS', error);
    });
    } else {
      console.log("There are missing fields");
    }
  });

  // CODE TO FORMAT PHONE
function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
    // mathmatically sounds weird but the return truncates the last number when using
    // event listener
  )}-${phoneNumber.slice(6, 10)}`;
}
// Add event listener for formatting
const inputField = selectElement('#phone');
inputField.addEventListener("input", 
function (event) {
  event.preventDefault();
  const formattedInputValue = formatPhoneNumber(inputField.value);
  inputField.value = formattedInputValue;
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  scrollFunction();
  scrollSection();
};
