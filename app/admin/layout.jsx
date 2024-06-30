import React from "react";
import TaskBar from "./_components/TaskBar";


const layout = ({ children }) => {

  return (
    <main>
      {children}
      <TaskBar />
    </main>
  );
};

export default layout;
