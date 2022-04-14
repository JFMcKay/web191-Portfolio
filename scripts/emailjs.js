// INIT EMAILJS
(function() {
emailjs.init("user_y8FlYv8xJcJbaWeKVIkEN");
})();
// FORMAT PHONE
var daPhone = document.getElementById("phone");
daPhone.addEventListener('onchange', formatPhoneNumber(), false);
function formatPhoneNumber() {
    let value = document.getElementById("phone").value;
    console.log(value);
    if (!value) {
        document.getElementById("phone").value = value;
        return;
    }
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) { 
        document.getElementById("phone").value = phoneNumber;
        return;
    }
    if (phoneNumberLength < 7) {
        document.getElementById("phone").value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        return;
    }
    document.getElementById("phone").value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6, 9)}`;
    return;
}

// SEND MAIL FUNCTION
function handleSubmit( event ) {
    event.preventDefault();
    sendForm(
        'service_uta9z8b',
        'template_yisvm6i',
        event.target,
        'user_y8FlYv8xJcJbaWeKVIkEN'
      )
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
        //   this.setState({sentNotice: 'showMessage'})
        //   setTimeout(resetForm());
        })
        .catch((err) => {
          console.log('FAILED...', err);
        //   this.setState({sentNotice: 'There was an issue please try again'})
        // 
    });
}

