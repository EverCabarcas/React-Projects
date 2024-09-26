import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(({ children, buttonCaption }, ref) => {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog ref={dialogRef} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">{children}
    <form method="dialog">
        <button className="mt-4 text-right">{buttonCaption}</button>
    </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
