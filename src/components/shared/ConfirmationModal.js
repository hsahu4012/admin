import Modal from 'react-bootstrap/Modal';

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
          <p>{props.modalMessage}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
      <button onClick={props.onHide} className="btn btn-secondary">Cancel</button>
        {props.wantToAddData === true?(
          <button onClick={props.confirmation} className="btn btn-danger">{props.operationType}</button>
        ):(<></>)}
      </Modal.Footer>
    </Modal>
  );
}
