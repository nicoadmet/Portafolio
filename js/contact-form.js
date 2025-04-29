
((d) => {
    const $form =  d.querySelector(".contact-form"),
        $loader = d.querySelector(".loader"),
        $btnForm = d.querySelector("#btnForm"),
        $response = d.querySelector(".contact-form-response"),
        $successImg = d.querySelector(".success-img"),
        $errorImg = d.querySelector(".error-img")
    
    d.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        $btnForm.classList.add("none");

        fetch("https://formsubmit.co/ajax/admetnico@gmail.com", {
            method: "POST",
            body: new FormData(e.target)
        })
        .then( res => res.ok ? res.json() : Promise.reject(res) )
        .then( json => {
            console.log(json);
            location.hash = "#enviado";
            $errorImg.classList.add("none");
            $form.reset();
        } )
        .catch( err => {
            console.log(err);
            $successImg.classList.add("none");
            let message = err.statusText || "Ocurrio un error"
            $response.querySelector("h3").innerHTML = `${err.status}: ${message}`
            location.hash = "#enviado";
        } )
        .finally( () => {
            setTimeout(() => {
                $loader.classList.add("none");
                $btnForm.classList.remove("none");
                location.hash = "close" //por defecto
            }, 3000)
        } )
    })

})(document)