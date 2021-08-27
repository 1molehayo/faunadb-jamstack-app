import "./App.css";
import React, { useEffect } from "react";
import LinkList from "./components/LinkList";
import LinkForm from "./components/LinkForm";
import { useAppContext } from "./contexts/appContext";

function App() {
  const { loadLinks, showForm, toggleForm } = useAppContext();

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">
        <span> List O' Link</span>
      </h1>

      <div className="text-center">
        <button className="btn btn-primary" onClick={() => toggleForm()}>
          Create Link
        </button>
      </div>

      {showForm && <LinkForm />}

      <LinkList />
    </div>
  );
}

export default App;
