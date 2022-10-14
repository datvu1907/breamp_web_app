import React, { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import ModalWallet from "../Modal/ModalWallet";
import { Modal, Button } from "react-bootstrap";

const AddModal = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          class="mx-3"
          font-size="25px"
        >
          <MdOutlineLibraryAdd onClick={handleShow} />
        </svg>
      </>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Add NFT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ModalWallet />
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="success" type="submit" block onClick={handleAdd}>
            Add New
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close Button
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default AddModal;
