let sess = sessionStorage.getItem("signin")
if(sess){
    let url = `http://localhost:3000/usersReg/${sess}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            document.querySelector("#dis").innerHTML = `${data.name}`
        })
}else{
    window.location = 'login.html'
}

document.querySelector("#logout").addEventListener("click", () => {
    sessionStorage.clear()
})
