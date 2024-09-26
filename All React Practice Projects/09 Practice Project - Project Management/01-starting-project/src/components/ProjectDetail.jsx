import { useRef } from "react";

const ProjectDetail = ({ indexAssociated, title, description, dueDate, onHandleAddTask, task, onHandleDeleteProject }) => {
 
 const taskFilter = task.filter((itemTask)=> itemTask.projectIndex === indexAssociated);
  const inputRef = useRef();
  const formmateDate = new Date(dueDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const handleAddTask = () => {
    const taskName = inputRef.current.value;
    if (taskName) {
        onHandleAddTask((prevTask) => [
        ...prevTask,
        {
          projectIndex: indexAssociated,
          taskName,
        },
      ]);
      inputRef.current.value = '';
    }
  };

  const handleClear = (taskName) => {
    onHandleAddTask((prevTaskArray)=>{
        const ArrayCopy = [...prevTaskArray]
        const found = ArrayCopy.findIndex((itemArray) => itemArray.projectIndex === indexAssociated && itemArray.taskName === taskName);
        ArrayCopy.splice(found, 1)
        return [...ArrayCopy]
    })
  }
  return (
    <>
      <p>
        <button className="text-stone-600 hover:text-stone-950" onClick={()=> onHandleDeleteProject(indexAssociated)}>Delete</button>
      </p>
      <div className="w-[35rem] mt-16">
        <h2 className="text-xl font-bold text-stone-700">{title}</h2>

        <div className="items-center justify-between">
          <p className="text-stone-400 mb-4">{formmateDate}</p>
          <p className="text-stone-800 mb-4">{description}</p>
        </div>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
        <input
          ref={inputRef}
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={handleAddTask}
          className="text-stone-600 hover:text-stone-950"
        >
          Add Task
        </button>
        {task.length > 0 ? (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {taskFilter.map(({ taskName }, index) => {
              return (
                <li key={`${index}-${taskName}-${title}`} className="flex justify-between my-4">
                  <p>{taskName}</p>
                  <button className="text-stone-700 hover:text-red-500" onClick={()=> handleClear(taskName)}>Clear</button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>This project does not have any tasks yet.</p>
        )}
      </div>
    </>
  );
};

export default ProjectDetail;
