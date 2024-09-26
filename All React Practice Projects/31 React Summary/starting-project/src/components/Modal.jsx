import { useNavigate } from "react-router-dom";
import clasess from "./Modal.module.css";
export default function Modal({ children }) {
  const navigate = useNavigate();
  function handleClose() {
    navigate("..");
  }
  return (
    <>
      <div className={clasess.backdrop} onClick={handleClose} />
      <dialog className={clasess.modal} open>
        {children}
      </dialog>
    </>
  );
}
