let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
}

function render(){
  const list=document.getElementById("taskList");
  list.innerHTML="";

  let completed=0;

  tasks.forEach((task,index)=>{
    const li=document.createElement("li");

    if(task.done) completed++;

    if(task.editing){
      const input=document.createElement("input");
      input.value=task.text;
      input.className="edit-input";

      setTimeout(()=>input.focus(),0);

      input.onkeypress=(e)=>{
        if(e.key==="Enter"){
          task.text=input.value.trim()||task.text;
          task.editing=false;
          save();render();
        }
      };

      input.onblur=()=>{
        task.text=input.value.trim()||task.text;
        task.editing=false;
        save();render();
      };

      li.appendChild(input);
    }else{
      const span=document.createElement("span");
      span.innerText=task.text;
      if(task.done) span.classList.add("done");

      span.onclick=()=>{
        task.done=!task.done;
        save();render();
      };

      li.appendChild(span);
    }

    const actions=document.createElement("div");
    actions.className="actions";

    const editBtn=document.createElement("button");
    editBtn.innerText="✏️";
    editBtn.className="edit";
    editBtn.onclick=(e)=>{
      e.stopPropagation();
      task.editing=true;
      render();
    };

    const delBtn=document.createElement("button");
    delBtn.innerText="🗑";
    delBtn.className="delete";
    delBtn.onclick=(e)=>{
      e.stopPropagation();
      tasks.splice(index,1);
      save();render();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(actions);
    list.appendChild(li);
  });

  document.getElementById("count").innerText =
    `Total: ${tasks.length} | Completed: ${completed}`;
}

function addTask(){
  const input=document.getElementById("taskInput");
  const text=input.value.trim();
  if(!text) return alert("Enter a task");

  tasks.push({text,done:false,editing:false});
  input.value="";
  save();render();
}

function handleEnter(e){
  if(e.key==="Enter") addTask();
}

function toggleMode(){
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

render();