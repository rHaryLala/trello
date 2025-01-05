import React from 'react';
import { Modal, Button } from 'flowbite-react';

const DeleteProject = ({ show, onClose, onDelete }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Confirmer la suppression</Modal.Header>
      <Modal.Body>
        <p>Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button color="failure" onClick={onDelete}>
          Supprimer
        </Button>
        <Button color="gray" onClick={onClose}>
          Annuler
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProject;