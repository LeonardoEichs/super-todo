import { ReactNode, useEffect, useRef } from "react";

import { Container, Outside } from "./styles";

import ReactDOM from "react-dom";

const modalRoot: HTMLElement | null = document.getElementById("modal-root");

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modelRef.current!.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <Outside>
        <Container ref={modelRef}>
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
};
export default Modal;
