const postsElement = document.getElementById('posts')
const usersElement = document.getElementById("users")

function getPosts(userId) {

    fetch("https://jsonplaceholder.typicode.com/posts?userId="+userId)
    .then(response => {

        if (response.ok) {

            return response.json()
        }
    })
    .then(posts => {

        postsElement.innerHTML = ""

        for (let post of posts) {

            let content = `

                <div id="post"> 
                
                    <h3>${post.title}</h3>
                    <h4>${post.body}</h4>
                </div>
            `

            postsElement.innerHTML += content
        }
    })
    
}

function getUsers() {

    return new Promise((resolve, reject) => {

        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => {

            if (response.ok) {

                return response.json()

            } else {

                reject("Something Went Wrong With Users")
            }
        })
        .then(users => {


            usersElement.innerHTML = ""
            
            for (let user of users) {

                let content = `

                    <div id="user" onclick="userClicked(${user.id}, this)"> 

                        <h3>${user.name}</h3>
                        <h3>${user.email}</h3>
                    </div>
                `

                usersElement.innerHTML += content
            }

            resolve()
        })
    })
}

getUsers()
.then(() => { 
    
    getPosts(1)
})
.catch((error) => alert(error))


function userClicked(id, element) {

    getPosts(id)

    let selectedElement = document.getElementsByClassName("selected")

    for (let elemnt of selectedElement) {

        elemnt.classList.remove("selected")
    }

    element.classList.add("selected")
}