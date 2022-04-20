// Element selector helper written after all the code will update as I get the chance.

const selectElement = selector => {
  const element = document.querySelector(selector);
  if(element) return element;
  throw new Error(`Something wen wrong, makesure that ${selector} exists or is typed correctly.`);
}

// removes active class from all active classes.
const removeClassActive = () => {

  let activeEl = selectElement(".active");
  activeEl.classList.remove("active");
}
// selected elements
const navHome = selectElement(".nav-home");
const navProj = selectElement(".nav-proj");
const navBlog = selectElement(".nav-blog");
const navAbout = selectElement(".nav-about");
const navItem = selectElement(".nav-item");
const projects = selectElement("#projects");
const blog = selectElement("#blog");
const about = selectElement("#about-contact");
const mybutton = selectElement("#btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = () => {
  scrollFunction();
};

const scrollFunction = () => {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
    if (inViewPort(projects)) {
      removeClassActive(".active");
      navProj.classList.add("active");
    } else {
      if (inViewPort(blog)) {
        removeClassActive(".active");
        navBlog.classList.add("active");
      } else {
        if (inViewPort(about)) {
          removeClassActive(".active");
          navAbout.classList.add("active")
        }
      }
    } 

  } else {
    let activeEl = selectElement(".active");
    activeEl.classList.remove("active");
    navHome.classList.add("active");
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

// code to test what ID's are in the viewport to set active points in the menu.
function inViewPort(elem) {
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 && 
    bounding.left >= 0 && 
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

function activeCheck() {
  if (inViewPort(blog)) {
    console.log('it is in viewport');
  } else {
    console.log('it is not in viewport');
  } 
}