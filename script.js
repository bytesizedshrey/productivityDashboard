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
//motivationQuote
function motivationQuote(){
var motivationQuoteContent = document.querySelector('.motivation-2 h1')
var motivationAuthor = document.querySelector('.motivation-3 h3')
async function fetchQuote(){
    let response = await fetch('https://api.quotable.io/random')
    let data = await response.json()

    motivationQuoteContent.innerHTML = data.content
    motivationAuthor.innerHTML = data.author
}
fetchQuote()
}
motivationQuote()

// Pomodoro timer logic with work sessions and breaks
function pomodoroTimer(){
    // Select DOM elements for the timer display and buttons
    const display = document.querySelector('.timer-display');
    const phaseDisplay = document.querySelector('.phase');
    const sessionDisplay = document.querySelector('.session-count');
    const startBtn = document.getElementById('pomodoro-start');
    const pauseBtn = document.getElementById('pomodoro-pause');
    const resetBtn = document.getElementById('pomodoro-reset');

    // If elements aren't found (e.g., script runs before HTML loads), exit early
    if (!display || !startBtn || !pauseBtn || !resetBtn || !phaseDisplay || !sessionDisplay) {
        return;
    }

    // Timer variables
    let interval = null; // Holds the setInterval ID
    let currentPhase = 'work'; // Current phase: 'work', 'shortBreak', or 'longBreak'
    let sessionCount = 1; // Tracks completed work sessions (resets after 4)
    let remaining = 0; // Remaining seconds for current timer

    // Durations in seconds (adjustable)
    const workDuration = 25 * 60; // 25 minutes work session
    const shortBreakDuration = 5 * 60; // 5 minutes short break
    const longBreakDuration = 15 * 60; // 15 minutes long break (can be 15-30 minutes as per technique)

    // Function to update the display with current time
    function updateDisplay(){
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        display.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }

    // Function to update phase and session displays
    function updatePhaseDisplay(){
        if (currentPhase === 'work') {
            phaseDisplay.textContent = 'Work Session';
            sessionDisplay.textContent = `Session ${sessionCount}`;
        } else if (currentPhase === 'shortBreak') {
            phaseDisplay.textContent = 'Short Break';
            sessionDisplay.textContent = `Session ${sessionCount}`;
        } else if (currentPhase === 'longBreak') {
            phaseDisplay.textContent = 'Long Break';
            sessionDisplay.textContent = `Session ${sessionCount}`;
        }
    }

    // Function to set the next phase and duration
    function setNextPhase(){
        if (currentPhase === 'work') {
            // After work, check if it's time for long break (every 4 sessions)
            if (sessionCount % 4 === 0) {
                currentPhase = 'longBreak';
                remaining = longBreakDuration;
            } else {
                currentPhase = 'shortBreak';
                remaining = shortBreakDuration;
            }
        } else {
            // After any break, go back to work and increment session
            currentPhase = 'work';
            remaining = workDuration;
            sessionCount++;
            // Reset session count after 4 work sessions
            if (sessionCount > 4) {
                sessionCount = 1;
            }
        }
        updatePhaseDisplay();
        updateDisplay();
    }

    // Initialize to first work session
    remaining = workDuration;
    updatePhaseDisplay();
    updateDisplay();

    // Start the timer
    function start(){
        if (interval) return; // Prevent multiple intervals
        interval = setInterval(() => {
            if (remaining <= 0) {
                clearInterval(interval);
                interval = null;
                alert("Time's up!"); // Notify user
                setNextPhase(); // Move to next phase
            } else {
                remaining--;
                updateDisplay();
            }
        }, 1000); // Update every second
    }

    // Pause the timer
    function pause(){
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    // Reset to beginning of cycle
    function reset(){
        pause();
        currentPhase = 'work';
        sessionCount = 1;
        remaining = workDuration;
        updatePhaseDisplay();
        updateDisplay();
    }

    // Attach event listeners to buttons
    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', pause);
    resetBtn.addEventListener('click', reset);

    // Optional: Manual break buttons
    const shortBreakBtn = document.getElementById('short-break-btn');
    const longBreakBtn = document.getElementById('long-break-btn');
    if (shortBreakBtn) {
        shortBreakBtn.addEventListener('click', () => {
            pause();
            currentPhase = 'shortBreak';
            remaining = shortBreakDuration;
            updatePhaseDisplay();
            updateDisplay();
        });
    }
    if (longBreakBtn) {
        longBreakBtn.addEventListener('click', () => {
            pause();
            currentPhase = 'longBreak';
            remaining = longBreakDuration;
            updatePhaseDisplay();
            updateDisplay();
        });
    }
}
pomodoroTimer();
const apiKey = '1bda90a1dc3242308bb100426261103'
let city = 'dubai'
var data = null
async function weatherAPICall(){
    var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city }`)
    data = await response.json()
    console.log(data.current.temp_c)
}
weatherAPICall()
var header1Date = document.querySelector(`.header1 h1`) 

function dateTime(){
    const totaldayofWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    
    var date = new Date()
    var dayOfWeek = totaldayofWeek[date.getDay()]
    var hours = date.getHours()
    var minutes = date.getMinutes()

    header1Date.innerHTML = `${dayOfWeek}, ${hours} : ${minutes}`
}

dateTime()