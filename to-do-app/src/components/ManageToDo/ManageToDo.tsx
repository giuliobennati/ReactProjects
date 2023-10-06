/* eslint-disable no-debugger */
import { Fragment, useState } from "react";
import style from "./ManageToDo.module.css";
import { BsPlusLg } from "react-icons/bs";
import { ITask, taskFilter } from "../../models/Interfaces";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import FormSelect from "react-bootstrap/FormSelect";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalCentered from "../ModalCentered/ModalCentered";


interface Props {
  onAddTask: (task: ITask) => void;
  statusTask: taskFilter;
  setStatusTask: (value: taskFilter) => void;
}

function ManageToDo({ onAddTask, statusTask, setStatusTask }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleClickNewTask = (titleTaskRef: React.RefObject<HTMLInputElement>, statusTaskRef: React.RefObject<HTMLSelectElement>) => {
    if (!titleTaskRef.current || !titleTaskRef.current.value || !titleTaskRef.current.value.trim()) {
      toast.error("Non hai inserito il nome del task!");
      return;
    }

    const newTask: ITask = {
      title: titleTaskRef.current.value,
      dateCreation: new Date().toLocaleDateString("it-IT", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: statusTaskRef.current!.value as ("Completed" | "Incompleted"),
      id: undefined
    };

    onAddTask(newTask);

    setShowModal(false);
  };

  return (
    <Fragment>
      <div className={style.btnsContainer}>
        <Button
          variant="primary"
          style={{ width: "20%" }}
          onClick={() => setShowModal(true)}
        >
          <BsPlusLg></BsPlusLg>
        </Button>

        <FormSelect
          value={statusTask}
          onChange={(e) => setStatusTask(e.target.value as taskFilter)}
          className="w-25">
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incompleted">Incompleted</option>
        </FormSelect>
      </div>

      <ModalCentered showModal={showModal} setShowModal={setShowModal} handleClickOk={handleClickNewTask}/>
      
      {/* {showModal && <ModalCentered showModal={showModal} setShowModal={setShowModal} handleClickOk={handleClickNewTask}/>}  */}


    </Fragment>
  );
}

export default ManageToDo;
