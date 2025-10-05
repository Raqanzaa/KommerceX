import React from "react";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
import AppRoutes from "./routes";

function App() {

  useEffect(() => {
    initFlowbite();
  }, []);

  return <AppRoutes />;
}

export default App;
