// Login Section
let log = document.querySelector("#log-form")
log.addEventListener("submit", logUsers)

function logUsers(e) {
    e.preventDefault()
    fetch(`http://localhost:3000/usersReg`)
        .then(res => res.json())
        .then(datas => {
            let email = document.querySelector("#log-email").value
            let password = document.querySelector("#pass").value

            datas.forEach(data => {
                if(email == data.email){
                    sessionStorage.setItem("signin", data.id)
                }
            })

            let findEmail = datas.find(user => {
                if(email == user.email){
                    return true
                }
            })
            let findPassword = datas.find(user => {
                if(password == user.password){
                    return true
                }
            })
            if(!findEmail){
                alert("Invalid Email")
            }else{
                if(!findPassword){
                    alert("Invalid Password")
                }else{
                    window.location = `home.html`
                }
            }
        })
    }