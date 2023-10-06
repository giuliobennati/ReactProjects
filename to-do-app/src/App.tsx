import "./App.css";
import ManageToDo from "./components/ManageToDo/ManageToDo";
import { Fragment, useEffect, useState } from "react";
import ShowTasks from "./components/ShowTask/ShowTasks";
import { ITask, taskFilter } from "./models/Interfaces";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { taskDb } from "./models/TaskDb";
// import { useLiveQuery } from "dexie-react-hooks";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [statusTask, setStatusTask] = useState<taskFilter>("All");

  useEffect(() => {
    taskDb.tasks.toArray().then((result: ITask[]) => setTaskList(result));
  }, []);

  const onAddNewTask = async (task: ITask) => {
    try{
      // localStorage.setItem("taskList", JSON.stringify([...taskList, task]));
      const id = await taskDb.tasks.add({
        ...task
      });

      task.id = id as number;

      setTaskList([...taskList, task]);
    }catch(ex){
      if(ex instanceof Error)
        toast.error(ex.message);
      else if(typeof ex === "string")
        toast.error(ex);
    }
  };

  const onSetTaskList = (newTaskList: ITask[]) => {
    setTaskList(newTaskList);
  }

  const handleSetTaskStatus = (status: taskFilter) => {
    setStatusTask(status);
  }

  return (
    <Fragment>
      <div className="to-do-container">
        <div className="title">
          <p>TODO LIST</p>
        </div>

        <ManageToDo setStatusTask={handleSetTaskStatus} statusTask={statusTask} onAddTask={onAddNewTask}></ManageToDo>

        {taskList.length > 0 && (statusTask == "All" || taskList.some(task => task.status == statusTask)) && <ShowTasks statusTask={statusTask} setTaskList={onSetTaskList} taskList={taskList}></ShowTasks>}
      </div>
    
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"/>
        
    </Fragment>
  );
}

export default App;
