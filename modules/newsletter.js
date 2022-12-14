function close_newsletter() {
    const newsletter_content = document.getElementById('newsletter');
    const newsletter_close = document.querySelector('.newsletter_close');
    let checkNewsletter = sessionStorage.getItem('newsletter_close');
    let emailValue = document.querySelector('.registration input[type="email"]');
    let emailSubmit = document.querySelector('.registration input[type="submit"]');
    let responseContent = document.querySelector('.response');
    let responseContentSpan = document.querySelector('.response_content span');

    emailSubmit.onclick = () =>{
        let mailCheck = document.querySelector('.registration .alert_mail');
        if (emailValue.value.length > 0 ) {
            sessionStorage.setItem('emailValue', emailValue.value);
            sessionStorage.setItem('newsletter_close', 'true');
            newsletter_content.classList.add("hidden");
            responseContentSpan.innerText = emailValue.value;
            responseContent.classList.remove("hidden");
            setTimeout(() => {
                responseContent.classList.add("hidden");
            }, 1600);
        } else {
            mailCheck.innerHTML = `<p>Campo de email vazio!!!</p>`
        }
    }
    if(checkNewsletter != undefined) {
        newsletter_content.classList.add("hidden");
    }else {
        newsletter_content.classList.remove("hidden");
    }
    newsletter_close.onclick = () => {
        newsletter_content.classList.add("hidden");
        sessionStorage.setItem('newsletter_close', 'true');
    }

}

export {
    close_newsletter
}