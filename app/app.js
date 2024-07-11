import { USERS } from "../db/server.js"
// POPUP start
const btnOpen = document.querySelector(".btn__open")
const bntClose = document.querySelector(".btn__close")
const popap = document.querySelector(".popap")
const overlay = document.querySelector(".overlay")
// POPUP end

// MODEL start
const model = document.querySelector(".model")
const modelName = document.querySelector(".model__name")
const modelUsername = document.querySelector(".model__username")
const modelPassword = document.querySelector(".model__password")
const modelPasswordConfirm = document.querySelector(".model__password-confirm")
const eyePassword = document.querySelector(".eye__password")
// MODEL end

// Card start
const wrapper = document.querySelector(".wrapper") 

// Card end




model.addEventListener("submit", (event)=>{
    event.preventDefault()
    let name = modelName.value
    let username = modelUsername.value
    let password = modelPassword.value
    let passwordConfirm = modelPasswordConfirm.value
    if(password !== passwordConfirm){
        modelPassword.style.border = "1px solid red"
        modelPasswordConfirm.style.border = "1px solid red"
        // return  alert("parol bir xil emas")
        return
    } modelPassword.style.border = "1px solid green"
     modelPasswordConfirm.style.border = "1px solid green"
    
    let existUSer = USERS.findIndex(user => user.username === username)
    console.log(existUSer);
    if(existUSer >= 0){
        return alert("username avval olingan")
    }
    let newUser = {
        id: new Date().getTime(),
        name,
        username,
        password
    }
    USERS.push(newUser)
    console.log(newUser);
    // modelName.value = ""
    // modelUsername.value = ""
    // modelPassword.value = ""
    // modelPasswordConfirm.value = ""
    model.reset()
    popupState("none")
    createCard(USERS)
})

eyePassword.addEventListener("click", ()=>{
    if(modelPassword.type === "text"){
        modelPassword.type = "password"
        eyePassword.textContent = "show"
    }else{
        modelPassword.type = "text"
           eyePassword.textContent = "hide"
    }
})

modelPassword.addEventListener("input", (e)=>{
    let val = e.target.value
    if(val){
        eyePassword.style.display = "block"
    }else{
        eyePassword.style.display = "none"
    }
})





function createCard(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.forEach(user => {
        let card = document.createElement("div")
        card.className = "card"
        console.log(card);
        card.innerHTML = `
        <div class="card__circle"></div>
        <h3>${user.name}</h3>
        <p>${user.username}</p>
        <p>${user.password}</p>
        `
        wrapper.appendChild(card)
    })
}
createCard(USERS)


btnOpen.addEventListener("click", ()=>{
    popupState("flex")
})

bntClose.addEventListener("click", ()=>{
    popupState("none")
})


overlay.addEventListener("click", ()=>{
    popupState("none")
})

function popupState (state){
    popap.style.display = state
}