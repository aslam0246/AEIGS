import React from 'react';
import TaskForm from './TaskForm';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <TaskForm onClose={onClose} />
    </div>
  );
};

export default Modal;
