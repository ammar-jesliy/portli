import React from "react";
import TaskBar from "./_components/TaskBar";
import AdminProvider from "./Provider";


const layout = ({ children }) => {

  return (
    <main>
      <AdminProvider>
        {children}
        <TaskBar />
      </AdminProvider>
    </main>
  );
};

export default layout;
