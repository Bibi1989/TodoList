function toastShow(msg, bg) {
    let div = document.createElement("div") 
    div.innerHTML = msg
    div.className = 'toast'
    div.style.backgroundColor = bg
    document.body.appendChild(div)
    setTimeout(() => div.remove(), 2000)
}

let regSubmit = document.querySelector("#form")
regSubmit.addEventListener("submit", postUsers)

function postUsers(e) {
    e.preventDefault()

    

    fetch(`http://localhost:3000/usersReg`)
        .then(res => res.json())
        .then(datas => {
            // console.log(datas)
            
            let name = document.querySelector("#reg-name").value
            let email = document.querySelector("#reg-email").value
            let password = document.querySelector("#pass").value
            let pass1 = document.querySelector("#pass1").value
            let find = datas.find(user => {
                console.log(user)
                if(email == user.email){
                    return true
                }
            })
            if(find) {
                toastShow("Email exist!!!", 'red')
            }else{

                    let data = {
                        name,
                        email,
                        password
                    }

                    if(!email && !name) {
                        toastShow("invalid email or empty field", 'red')
                    }else{
                        if(password != pass1) {
                            toastShow("Password does not match", 'red')
                        }else {
                            let url = `http://localhost:3000/usersReg`
                            fetch(url, {
                                method: 'post',
                                headers: {
                                    'Accept': "applicaton/json",
                                    'content-type': "application/json"
                                },
                                body: JSON.stringify(data)
                            })
                                .then(res => res.json())
                                .then(data => {
                                    toastShow("Register Successfully", 'green')
                                    window.location = 'home.html'
                                })
                        }
                }
            }
                    
            })
           

}



