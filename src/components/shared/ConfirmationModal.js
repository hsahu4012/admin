import Modal from 'react-bootstrap/Modal';
import { IoClose } from "react-icons/io5";

export const ConfirmationModal = (props) => {
 return (
     <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className='d-flex justify-content-between'>
          {props.modalMessage}
          <IoClose size={35} onClick={props.onHide}/>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        {props.wantToAddData === true?(
          <button onClick={props.confirmation} className="btn btn-primary">{props.operationType}</button>
        ):(<></>)}
        <button onClick={props.onHide} className="btn btn-danger">Cancel</button>
      </Modal.Footer>
    </Modal>
  );
}
