import MenuItem from "./MenuItem";

export default function SideBar({
  onAddProject,
  menuItems,
  onHandleItemIndex,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your projects
      </h2>
      <p>
        <button
          className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
          onClick={onAddProject}
        >
          + Add Project
        </button>
      </p>
      <ul className="mt-8">
        {menuItems.map((item, index) => {
          return (
            <li key={item.dueDate} className="flex justify-between my-4">
              <MenuItem
                title={item.title}
                index={index}
                onSelectedItem={()=> onHandleItemIndex(index)}
              />
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
