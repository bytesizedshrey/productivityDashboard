let form = document.querySelector('.addTask form')
let taskInput = document.querySelector('.addTask form #task-input')
let taskDetailsInput = document.querySelector('.addTask form textarea')
let taskCheckbox = document.querySelector('.addTask form #checkbox')

function openFeatures(){
let allElems = document.querySelectorAll('.elem');// select all clickable cards on the home screen
let fullElemPage = document.querySelectorAll('.fullElem')// select all full pages (hidden sections that open)
let fullElemPageBackButton = document.querySelectorAll('.fullElem .back')// select all back/close buttons inside full pages

// open the corresponding full page when a card is clicked
allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        // Hide all pages first
        fullElemPage.forEach(page => page.style.display = 'none')
        // Show the clicked page
        const pageIndex = parseInt(elem.id)
        fullElemPage[pageIndex].style.display = 'block'
        localStorage.setItem('currentView', elem.id)
    })
})
// attach click event to every back button
fullElemPageBackButton.forEach(function(back){
    back.addEventListener('click',function(){
        fullElemPage[back.id].style.display = 'none'
        localStorage.removeItem('currentView')
    })
})
}
// Call the function to enable card opening
openFeatures()
function todoList(){
    let currentTask = [];
if(localStorage.getItem('currentTask')){
    currentTask = JSON.parse(localStorage.getItem('currentTask'))
}else{
    console.log(`It's Empty`)
    localStorage.setItem('currentTask',currentTask)
}
function renderTask(){
    // Get the container where all tasks will be displayed
    let allTask = document.querySelector('.allTask')
    // Initialize an empty string to build HTML
    let sum = ''
    // Loop through each task in the currentTask array
    currentTask.forEach(function(elem){
        // Create HTML for each task with task name, importance indicator, and a button
        sum += `<div class="task">
                        <h5>${elem.task} <span class="${elem.imp}">imp</span></h5>
                        <button>Mark As Completed</button>
                    </div>`
    })
    // Display all the tasks on the page
    allTask.innerHTML = sum

    // Get all the "Mark As Completed" buttons
    let markButtons = document.querySelectorAll('.task button');
    // Add click event listener to each button
    markButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Remove the task at this index from the array
            currentTask.splice(index, 1);
            // Save the updated task list to localStorage
            localStorage.setItem('currentTask', JSON.stringify(currentTask));
            // Re-render the tasks to update the display
            renderTask();
        });
    });
}


form.addEventListener('submit',function(e){
    e.preventDefault()
    currentTask.push({
        task: taskInput.value,
        details: taskDetailsInput.value,
        imp: taskCheckbox.checked
    })
    
    localStorage.setItem('currentTask',JSON.stringify(currentTask))
    taskInput.value = ''
    taskDetailsInput.value = ''
    taskCheckbox.checked = false
    renderTask()
})
}
todoList()
function dayPlanner(){
    // DayPlanner
var dayPlanData = JSON.parse(localStorage.getItem(`dayPlanData`)) || {}
var dayPlanner = document.querySelector('.day-planner')
var hours = Array.from({length:18},(_,idx)=>{return `${6+idx}:00 - ${7+idx}:00`})

var wholeDaySum = ''
//just for printing the time or hours.
hours.forEach(function(elem,idx){
    var savedData = dayPlanData[idx] || ''
    wholeDaySum = wholeDaySum + `<div class="day-planner-time">
            <p>${elem}</p>
            <input id="${idx}" type="text" placeholder="..." value="${savedData}">
        </div>`
})

dayPlanner.innerHTML = wholeDaySum

// Now select the inputs after they've been added to the DOM
var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
    elem.addEventListener('input',function(){
        dayPlanData[elem.id] = elem.value
        localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
    })
})
}
dayPlanner()

// Restore the last opened view on page refresh
let currentView = localStorage.getItem('currentView')
if(currentView !== null){
    let fullElemPage = document.querySelectorAll('.fullElem')
    const pageIndex = parseInt(currentView)
    fullElemPage[pageIndex].style.display = 'block'
}