// components/ConfirmationDialog.tsx

import React from 'react';
import Modal from 'react-modal';
import TextButton from './button/textButton';

type ConfirmationDialogProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
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
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-xl text-gray-900 font-semibold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <TextButton
            name="Confirmar"
            style="red"
            onClick={onConfirm} />
          <TextButton
            name="Cancelar"
            style="subtle"
            onClick={onCancel} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
