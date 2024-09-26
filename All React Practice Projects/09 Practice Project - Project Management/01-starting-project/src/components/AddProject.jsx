import { useRef } from "react";
import Modal from "./Modal";

export default function AddProject({ onAddProjectList, onCancelProject }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dueDateRef = useRef();
  const modalRef = useRef();

  function handleSaveProject() {
    const project = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
    };

    if(project.title.trim() === '' || project.description.trim() === '' || project.dueDate.trim() === ''){
      modalRef.current.open();
      return;
    } 

    if (
      titleRef.current.value &&
      descriptionRef.current.value &&
      dueDateRef.current.value
    ) {
      onAddProjectList(project);
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      dueDateRef.current.value = null;
      onCancelProject();
    }
  }
  return (
    <>
    <Modal ref={modalRef} buttonCaption='Close'>
      <h2 className="text-xl font-bold text-stone-500 my-4">Invalid Input</h2>
      <p className="text-stone-600 mb-4">Oops ... looks like you forgot to enter a value.</p>
      <p className="text-stone-600 mb-4">Please Make sure you provide a valid value for every input field.</p>
    </Modal>
      <div className="mt-4 text-right">
        <menu className="flex items-center justify-end gap-4 my-4">
          <button
            className="text-stone-800 hover:text-stone-950"
            onClick={onCancelProject}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveProject}
            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          >
            Save
          </button>
        </menu>
      </div>

      <div className="w-full mt-16">
        <label className="text-sm font-bold uppercase text-stone-500">
          title
        </label>
        <input
          ref={titleRef}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          description
        </label>

        <textarea
          ref={descriptionRef}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          type="text"
        />

        <label className="text-sm font-bold uppercase text-stone-500">
          due date
        </label>
        <input
          ref={dueDateRef}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          type="date"
        />
      </div>
    </>
  );
}
