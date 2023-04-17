const addTask = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const inputTask = document.getElementById('input-task');
const taskTime = document.getElementById('task-time');
const form = document.querySelector('form');
const body = document.querySelector('body');
const saveTaskContainer = document.getElementById('save-task-container');
const modelContainer = document.getElementById('model-container');
const closeBtn = document.getElementById('close-btn');


// code changing background color
function changeBackground() {
    
    const RGBACode = ['0', '1', '2','3','4', '5', '6', '7', '8', '9', 'A', 'B','C', 'D', 'E', 'F'];
    let colorCode = []
        
    for ( let i = 0; i < 6; i++ ) {
        function changeFace() {
            let randomNumber = Math.floor(Math.random() * RGBACode .length);
            gottenRandomly = RGBACode[randomNumber];
            colorCode.push(gottenRandomly);
        }
        changeFace(); 
    }
    let newColorCode = colorCode.join('');
    body.style.background = `#${newColorCode}`;
    //console.log(newColorCode);
}

setInterval(changeBackground, 1000);


//code submitting the form
let saidTask = new Array()

form.addEventListener('submit', function(e) {

    e.preventDefault();

    if(inputTask.value === "" || taskTime.value === "") {
        return;
    } 

    const fd = new FormData(form)
    
    const obj = Object.fromEntries(fd);
    //console.log(obj);

    saidTask.push(obj);
    
    //console.log(saidTask);

    json = JSON.stringify(saidTask);

    console.log(json);

    
    localStorage.setItem('form', json);

    //window.location.href = 'text.json';

    inputTask.value = "";
    taskTime.value = "";
      
});


//closing model 
closeBtn.addEventListener('click', function(){
    modelContainer.style.display = 'none';
});


// adding task, check task and delete task
addTask.addEventListener('click', function() {

    let task = document.createElement('div');
    task.classList.add('task');

    let dl = document.createElement('dl');
    task.appendChild(dl);

    let dt = document.createElement('dt');
    dt.innerText = `${inputTask.value}`;
    dl.appendChild(dt);

    let dd = document.createElement('dd');
    dd.innerText = `${taskTime.value}`;
    dl.appendChild(dd);

    let checkButton = document.createElement('button');
    checkButton.innerHTML = "<i class='fa fa-check'></i>";
    checkButton.classList.add('checkTask');
    task.appendChild(checkButton);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
    deleteButton.classList.add('deleteTask');
    task.appendChild(deleteButton);

    if(inputTask.value === "" || taskTime.value === "") {
        modelContainer.style.display = 'block'
        return;
    } else {
        taskContainer.appendChild(task);
    }

    checkButton.addEventListener('click', function() {
        checkButton.parentElement.style.textDecoration = 'line-through'
    });
 
    deleteButton.addEventListener('click', function(e) {
        let target = e.target;
        target.parentElement.remove();
    });

});


//get data back from storage
function keep() {

    let saveItem = localStorage.getItem('form');

    //console.log(saveItem);
 
    let retriveItem = JSON.parse(saveItem);

    //console.log(retriveItem);

    for(i = 0; i < retriveItem.length; i++) {

        let saveDiv = document.createElement('div');
        saveDiv.classList.add('save');  
        saveTaskContainer.append(saveDiv);

        let dl = document.createElement('dl');
        saveDiv.append(dl);

        let dt = document.createElement('dt');
        dt.innerText = retriveItem[i].task; 
        console.log(dt.textContent);
        dl.append(dt);

        let dd = document.createElement('dd');
        dd.innerText = retriveItem[i].time;
        console.log(dd.textContent);
        dl.append(dd);    
        
        let checkButton = document.createElement('button');
        checkButton.innerHTML = "<i class='fa fa-check'></i>";
        checkButton.classList.add('checkSave');
        saveDiv.append(checkButton);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fa fa-trash'></i>";
        deleteButton.classList.add('deleteTask');
        saveDiv.appendChild(deleteButton);
        
        checkButton.addEventListener('click', function() {
            checkButton.parentElement.style.textDecoration = 'line-through'
        });

        deleteButton.addEventListener('click', function(e) {
            let target = e.target;
            target.parentElement.remove();
        });

    };
}
keep()

localStorage.clear();