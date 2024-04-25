import { ReactElement } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content: ReactElement;
  overlay?: boolean;
}

function Modal({ isOpen, setIsOpen, content }: ModalProps) {
  const closeModal = () => {
    setIsOpen(false);
  };

  //! NOT FINISHED
  return (
    <div className="modal-container">
      <div className={`overlay ${isOpen ? "" : "hidden"}`} onClick={closeModal}>
        <div className={`modal ${isOpen ? "open" : ""}`}>
          <div className="modal-content">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
