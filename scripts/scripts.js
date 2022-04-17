let mybutton = document.getElementById("btn-back-to-top");

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

const validateMe = () => {
  // Variables for better readability
  let formLength = document.forms[0].elements.length;
  for (var i=0;i<formLength;i++){
      let errorarea = document.forms[0].elements[i].name + "_error";
      let msg = document.forms[0].elements[i].name;
          if (document.forms[0].elements[i].value == ''){
              document.getElementById(errorarea).innerHTML = 'Please enter your ' + msg;
              // moved to css
              // document.getElementById(errorarea).style.color = '#ff0000'; 
              document.forms[0].elements[i].focus();
              return false;
          }
          else 
          {
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