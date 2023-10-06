import { ITask, taskFilter } from "../../models/Interfaces";
import styles from "./showTasks.module.css";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { Fragment, useState } from "react";
import ModalCentered from "../ModalCentered/ModalCentered";
import { toast } from "react-toastify";

interface TaskListProps {
    taskList: ITask[];
    setTaskList: (taskList: ITask[]) => void;
    statusTask: taskFilter;
}

function ShowTasks({ taskList, setTaskList, statusTask }: TaskListProps) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskSelected, setTaskSelected] = useState<ITask | null>(null);

    const confirmEditTask = (titleTaskRef: React.RefObject<HTMLInputElement>, statusTaskRef: React.RefObject<HTMLSelectElement>, taskToEdit?: ITask | null) => {
        try{
            if (!titleTaskRef.current || !titleTaskRef.current.value) {
                toast.error("Non hai inserito il nome del task!");
                return;
            }
    
            if (taskToEdit == null) {
                toast.error("Il task da modificare risulta non selezionato!");
                return;
            }
    
            taskToEdit.title = titleTaskRef.current.value;
            taskToEdit.status = statusTaskRef.current!.value as ("Completed" | "Incompleted");
    
            setTaskList([...taskList]);
    
            localStorage.setItem("taskList", JSON.stringify([...taskList]));
    
            setShowEditModal(false);
        }catch(ex){
            if(ex instanceof Error)
              toast.error(ex.message);
            else if(typeof ex === "string")
              toast.error(ex);
        }
    };

    const handleRemoveTask = (index: number) => {
        try{
            taskList.splice(index, 1);
    
            setTaskList([...taskList]);
            localStorage.setItem("taskList", JSON.stringify([...taskList]));
    
            toast.success("Attività rimossa con successo!");
        }catch(ex){
            if(ex instanceof Error)
                toast.error(ex.message);
            else if(typeof ex === "string")
                toast.error(ex);
        }
    };

    const handleTaskStatus = (task : ITask) => {
        task.status = task.status == "Completed" ? "Incompleted" : "Completed";
        setTaskList([...taskList]);
        localStorage.setItem("taskList", JSON.stringify([...taskList]));
    }

    return  (
        <Fragment>
            <div className={styles.containerTasks}>
                {taskList.map((task: ITask, index) => {
                    
                    if(statusTask != "All" && statusTask != task.status)
                        return;
                    
                    return (
                        <div key={index} className={styles.singleTaskContainer}>
                            <div className={styles.infoTaskContainer}>
                                <div className={styles.graphicBlockContainer}>
                                    <button className={`${styles.graphicBlock} ${task.status == "Completed" ? styles.completed : styles.notCompleted}`} onClick={() => handleTaskStatus(task)}>
                                        {task.status == "Completed" && <AiOutlineCheck></AiOutlineCheck>}
                                    </button>
                                </div>
                                <div className={styles.taskInfoInternalContainer}>
                                    <div style={{ height: "fit-content", width: "auto" }}>
                                        {task.title}
                                    </div>
                                    <div
                                        style={{
                                            height: "fit-content",
                                            width: "auto",
                                            color: "#a0a0a0",
                                        }}
                                    >
                                        {task.dateCreation}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.taskActionsContainer}>
                                <button
                                    className={styles.btnTaskAction}
                                    onClick={() => handleRemoveTask(index)}
                                >
                                    <BsTrash></BsTrash>
                                </button>
                                <button
                                    className={styles.btnTaskAction}
                                    onClick={() => {
                                        setTaskSelected(task);
                                        setShowEditModal(true);
                                    }}
                                >
                                    <AiFillEdit></AiFillEdit>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <ModalCentered
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                taskToEdit={taskSelected}
                handleClickOk={confirmEditTask}
            />
        </Fragment>
    );
}

export default ShowTasks;
