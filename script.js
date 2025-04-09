document.addEventListener('DOMContentLoaded',()=>{



    let inputname = document.getElementById("input-name");
    let inputprice = document.getElementById("input-price");
    let total = document.getElementById("total");
    let btn = document.getElementById("add-btn");
    const todolist = document.getElementById("listItem")
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    
    tasks.forEach(task => {
        renderTask(task)
    });
    enter(inputname);
    enter(inputprice);
    function enter(x){
    x.addEventListener("keypress", (e)=>{
        if(e.key === 'Enter'){
            let taskValue = inputname.value.trim();
            let taskprice = inputprice.value.trim();
            if(taskValue === "" || taskprice === ""){
               return
            }
            else{
                const newTask = {
                    id: Date.now(),
                    text: taskValue,
                    price: taskprice,
                    completed: false 
                }
                tasks.push(newTask)
                renderTask(newTask);
                saveTask();
                inputname.value = "";
            inputprice.value ="";
            }
        }
    });
}
    btn.addEventListener('click',()=>{
        let taskValue = inputname.value.trim();
        let taskprice = inputprice.value.trim();
        if(taskValue === "" || taskprice === ""){
           return
        }
        else{
            const newTask = {
                id: Date.now(),
                text: taskValue,
                price: taskprice,
                completed: false 
            }
            tasks.push(newTask)
            renderTask(newTask);
            saveTask();
            inputname.value = "";
            inputprice.value ="";
        }
        
    }) 
    
    function saveTask(){
         localStorage.setItem("task",JSON.stringify(tasks))
    }
    
    function renderTask(task){
       const li = document.createElement("li");
       li.setAttribute("Data-Id", task.id)
       if(task.completed) li.classList.add("completed");
       li.innerHTML=`
       <span>${task.text} - $${task.price}</span><button>Delete</button>
       `;
       sum(tasks)
       li.addEventListener('click',(e)=>
    {
        if(e.target.tagName === "Button") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTask();
    })
    li.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation();
        tasks = tasks.filter((t) => t.id !== task.id);
        sum(tasks)
        li.remove();
        saveTask();
    })
       todolist.appendChild(li); 
    }
    function sum(arr){
        let sum = 0;
        arr.forEach((e) =>{
            sum += JSON.parse(e.price);
        })
        total.innerHTML = sum;
    }

    })
    