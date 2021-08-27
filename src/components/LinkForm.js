import React from "react";
import { LINK_MODEL } from "../models/link";
import Modal from "react-modal";
import axios from "../services/axios";
import { useAppContext } from "../contexts/appContext";

export default function LinkForm() {
  const {
    loadLinks: refreshLinks,
    showForm,
    toggleForm,
    form,
    setForm,
  } = useAppContext();

  Modal.setAppElement("#root");

  const updateForm = (prop, val) => {
    const obj = { ...form };
    obj[prop] = val;
    setForm(obj);
  };

  const resetForm = () => {
    setForm(...LINK_MODEL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...form };

    try {
      if (body._id) {
        delete body._id;
        await axios.put("/updateLink", JSON.stringify(body));
      } else {
        await axios.post("/createLink", JSON.stringify(body));
      }

      resetForm();
      refreshLinks();
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={showForm}
      closeTimeoutMS={500}
      onRequestClose={toggleForm}
      style={customStyles}
      contentLabel={form._id ? "Edit Link" : "Add New Link"}
    >
      <div className="card form">
        <div className="card-header">
          <span>{form._id ? "Edit Link" : "Add New Link"}</span>
          <button className="btn btn--close" onClick={() => toggleForm()}>
            X
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">URL</label>
              <input
                type="text"
                name="url"
                className="form-control"
                value={form.url}
                onChange={(e) => updateForm("url", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                className="form-control"
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
