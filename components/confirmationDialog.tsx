// components/ConfirmationDialog.tsx

import React from 'react';
import Modal from 'react-modal';
import TextButton from './button/textButton';

type ConfirmationDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  items?: string[];
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  items = [],
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      contentLabel="Confirmation Dialog"
    >
      <div className="bg-background p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl text-title font-semibold mb-4">{title}</h2>
        <p className="text-subtitle mb-6">{message}</p>
        {items.length > 0 && 
          <ul>
            {items.map((item) => <li>{item}</li>)}
          </ul>}
        <div className="flex justify-end space-x-4">
          <TextButton
            name="Confirmar"
            style="red"
            onClick={onConfirm} />
          <TextButton
            name="Cancelar"
            style="transparent"
            onClick={onCancel} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
