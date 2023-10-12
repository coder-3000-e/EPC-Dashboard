import React from 'react';
import Modal from 'react-modal';
import './style.css';

Modal.setAppElement('#root');

interface DashBoardModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  modalComponent: JSX.Element;
}

const DashBoardModal: React.FC<DashBoardModalProps> = ({ isOpen, onRequestClose, modalComponent: ModalComponent }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Chart"
    className="modal"
    overlayClassName="modal-overlay"
  ><div className='dash'>
    {ModalComponent}
    <button style={{
      marginLeft: '50%',
      borderColor: '#000000',
      color: '#fff',
      boxShadow: '0 0 40px 40px #042f7d inset, 0 0 0 0 #00268d',
      transition: 'all 150ms ease-in-out'
    }} onClick={onRequestClose}>Close Modal</button>
      </div>
  </Modal>
);

export default DashBoardModal;
