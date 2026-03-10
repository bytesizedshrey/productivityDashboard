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
    var allTask = document.querySelector('.allTask')
    // Initialize an empty string to build HTML
    var sum = ''
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