import { Button, Modal } from "react-bootstrap";
import { ITask } from "../../models/Interfaces";
import { useEffect, useRef } from "react";

interface ModalCenteredProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  taskToEdit?: ITask | null;
  handleClickOk: (titleTaskRef: React.RefObject<HTMLInputElement>, statusTaskRef: React.RefObject<HTMLSelectElement>, taskToEdit?: ITask | null) => void;
}

function ModalCentered({ showModal, setShowModal, handleClickOk, taskToEdit = null }: ModalCenteredProps) {

  const titleTaskRef = useRef<HTMLInputElement>(null);
  const statusTaskRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {

    if(titleTaskRef && titleTaskRef.current)
      titleTaskRef.current!.value = taskToEdit ? taskToEdit.title : "";

    
    if(statusTaskRef && statusTaskRef.current){
      if(taskToEdit)
        statusTaskRef.current.value = taskToEdit.status;
      else
        statusTaskRef.current.value = "Incompleted";
    }
      
  });

  return (
    <Modal
      show={showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {
            taskToEdit != undefined ? 'Edit ' : 'Add '
          }
          Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-4">
          <input
            ref={titleTaskRef}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Content"
          />
          <label htmlFor="floatingInput">Task title</label>
        </div>
        <select
          ref={statusTaskRef}
          className="form-select"
          aria-label="Default select example"
        >
          <option value="Completed">Completed</option>
          <option value="Incompleted">Incompleted</option>
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowModal(false)}>Close</Button>
        <Button onClick={() => handleClickOk(titleTaskRef, statusTaskRef, taskToEdit)}>Ok</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalCentered;