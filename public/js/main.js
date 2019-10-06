// Displaying data when data is post to the server
window.onload = function() {
    setTimeout(() => getFile(), 1000)
}

// Toast messages
function toastShow(msg, bg) {
    let div = document.createElement("div") 
    div.innerHTML = msg
    div.className = 'toast'
    div.style.backgroundColor = bg
    document.body.appendChild(div)
    setTimeout(() => div.remove(), 2000)
}

let date = new Date
// console.log(date.getHours(), date.getMinutes(), date.getMonth(), date.getFullYear(), date.toLocaleString('day'))

// Global variable storing the url for post and update of datas
let postData = ""
let updateData = ""

// accessing the form dom element and giving it submit event
let submitForm = document.querySelector("#form")
submitForm.addEventListener("submit", submitFile)

// handler for posting and updating datas to the server
function submitFile(e) {
    e.preventDefault()
    if(updateData){
        let name = document.querySelector("#name").value
        let title = document.querySelector("#title").value
        let todo = document.querySelector("#email").value

        const data= {
            name,
            title,
            todo,
            date: date.toLocaleString('day')
            
        }

        if(name && title && email) {
            // Post data to Server
            fetch(updateData, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(datas => {
                console.log(datas)
            })

            // alert sucess
            toastShow("Updated Successfuly!!!", 'green')
            // window.location = 'home.html'

            // clear data fields
            document.querySelector("#name").value = ''
            document.querySelector("#title").value = ''
            document.querySelector("#email").value = ''
        } else {
            toastShow("Empty Fields please fill all input", 'red')
        }
    } else {
        postData = `http://localhost:3000/list`

        let name = document.querySelector("#name").value
        let title = document.querySelector("#title").value
        let todo = document.querySelector("#email").value

        const data= {
            name,
            title,
            todo,
            date: date.toLocaleString('day')
        }

        if(name && title && email) {
            // Post data to Server
            fetch(postData, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(datas => {
                console.log(datas)
            })

            // alert sucess
            toastShow("Submitted Successfuly!!!", 'green')
            // window.location = 'home.html'

            // clear data fields
            document.querySelector("#name").value = ''
            document.querySelector("#title").value = ''
            document.querySelector("#email").value = ''
        } else {
            // alert("")
            toastShow("Empty Fields please fill all input", "red")
        }
    }
}


// Function for getting, deleting and updating datas to the server
function getFile() {
    // Get data from server
    fetch(`http://localhost:3000/list`).then(res => res.json()).then(datas => {
        
            console.log(datas[0])
            for(let i = 0; i < datas.length; i++) {
                document.querySelector(".display").innerHTML += `
                    <p class="update" id=${datas[i].id}>Update</p>
                    <p>${datas[i].name}</p>
                    <p>${datas[i].title}</p>
                    <p>${datas[i].todo}</p>
                    <p class="remove" id=${datas[i].id}>X</p>
                `
            }
            let d = document.querySelectorAll(".remove")
            d.forEach(de => {
                de.addEventListener("click", deleteFile)

                // Delete file from server
                function deleteFile(e) {
                    let deleteId = e.target.id
                    // console.log(deleteId)
                    let url = `http://localhost:3000/list/${deleteId}`
                    console.log(url)
                    fetch(url, {
                        method: "delete"
                    })
                        .then(res => res.json())
                        .then(() => {
                            toastShow("File Deleted!", 'red')
                            // window.location = 'home.html'
                        })
                }
            })

            let update = document.querySelectorAll(".update")
            update.forEach(up => {
                up.addEventListener("click", updateFile)

                // Delete file from server
                function updateFile(e) {
                    let updateId = e.target.id
                    // console.log(deleteId)
                    updateData = `http://localhost:3000/list/${updateId}`
                    console.log(updateData)
                    fetch(updateData)
                        .then(res => res.json())
                        .then(datas => {
                            let name = document.querySelector("#name")
                            let title = document.querySelector("#title")
                            let todo = document.querySelector("#email")

                            console.log(datas.name)
                            

                            name.value = `${datas.name}`
                            title.value = `${datas.title}`
                            todo.value = `${datas.todo}`
                        })
                }
            })
            

            // document.querySelector("#dis").innerHTML = `${datas[0].email}`
    })
    
}




