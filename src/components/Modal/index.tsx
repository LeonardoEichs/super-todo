import { ReactNode, useEffect } from "react";

import { Container, Outside } from "./styles";

import ReactDOM from "react-dom";

const modalRoot: HTMLElement | null = document.getElementById("root");

interface ModalProps {
  children: ReactNode;
  onClose?: any;
}

const Modal = ({ children, onClose }: ModalProps) =>
  ReactDOM.createPortal(
    <>
      <Outside>
        <Container>
          {children}
          {onClose && (
            <>
              <hr />
              <button onClick={onClose}>Close</button>
            </>
          )}
        </Container>
      </Outside>
    </>,
    modalRoot as HTMLElement
  );

export default Modal;
