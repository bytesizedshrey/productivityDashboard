function openFeatures(){
let allElems = document.querySelectorAll('.elem');// select all clickable cards on the home screen
let fullElemPage = document.querySelectorAll('.fullElem')// select all full pages (hidden sections that open)
let fullElemPageBackButton = document.querySelectorAll('.fullElem .back')// select all back/close buttons inside full pages

// open the corresponding full page when a card is clicked
allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        fullElemPage[elem.id].style.display = 'block'
    })
})
// attach click event to every back button
fullElemPageBackButton.forEach(function(back){
    back.addEventListener('click',function(){
        fullElemPage[back.id].style.display = 'none'
    })
})
}
// openFeatures()

let form = document.querySelector('.addtask form')
let taskInput = document.querySelector('.addtask form input')
let taskDetailsInput = document.querySelector('.addtask form textarea')

form.addEventListener('submit',function(hehe){
    hehe.preventDefault()
})