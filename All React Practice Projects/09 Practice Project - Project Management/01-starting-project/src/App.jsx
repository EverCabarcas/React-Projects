import SideBar from "./components/SideBar";
import AddProject from "./components/AddProject";
import EmptyProject from "./components/EmptyProject";
import { useState } from "react";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  const [addProject, setAddProject] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [task, setTask] = useState([]);

  const [activeItem, setActiveItem] = useState({
    itemIndex: null,
  });

  const handleItemIndex = (index) => {
    setActiveItem((prev) => ({ ...prev, itemIndex: index }));
  };

  function handleAddProject() {
    setAddProject(true);
  }
  function handleCancelProject() {
    setAddProject(false);
  }
  function handleAddProjectList(projectObject) {
    setProjectList((prevList) => [...prevList, { ...projectObject }]);
  }

  function handleDeleteProject(indexProject) {
    setProjectList((prevProjects) => {
      const copyArray = [...prevProjects]
      copyArray.splice(indexProject, 1);

      return [...copyArray];
    });
    setActiveItem(() => ({
      itemIndex: null,
    }));
  }

  let content;

  if (addProject) {
    content = (
      <AddProject
        onAddProjectList={handleAddProjectList}
        onCancelProject={handleCancelProject}
      />
    );
  } else {
    if (activeItem?.itemIndex < 0 || activeItem?.itemIndex === null) {
      content = <EmptyProject onAddProject={handleAddProject} />;
    }
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onAddProject={handleAddProject}
        menuItems={projectList}
        onHandleItemIndex={handleItemIndex}
      />
      {content}
      {!addProject && activeItem?.itemIndex !== null && (
        <ProjectDetail
          indexAssociated={activeItem.itemIndex}
          {...projectList[activeItem.itemIndex]}
          onHandleAddTask={setTask}
          task={task}
          onHandleDeleteProject={handleDeleteProject}
        />
      )}
    </main>
  );
}

export default App;
