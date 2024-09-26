
import img from "../assets/no-projects.png";

export default function EmptyProject({ onAddProject }){
    return(
        <div className="mt-24 text-center w-2/3">
             <img className="w-16 h-16 object-contain mx-auto" src={img} />
             <h1 className="text-3xl font-bold text-stone-600 mb-2">No Project Selected</h1>
             <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
             <button onClick={onAddProject} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Create new project</button>
        </div>
       
    )
}