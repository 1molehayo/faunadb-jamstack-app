import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "../services/axios";
import { useAppContext } from "../contexts/appContext";
import PromptModal from "./PromptModal";

function LinkCard({ link }) {
  const { loadLinks: refreshLinks, toggleForm } = useAppContext();
  const [showPrompt, setShowPrompt] = useState(false);

  const togglePrompt = () => setShowPrompt((prevState) => !prevState);

  const toggleArchiveLink = async () => {
    link.archived = !link.archived;

    try {
      await axios.put("/updateLink", JSON.stringify(link));
      refreshLinks();
    } catch (error) {
      console.error("AHHH", error);
    }
  };

  const deleteLink = async () => {
    const id = link._id;
    try {
      await axios.put("/deleteLink", JSON.stringify({ id }));
      refreshLinks();
    } catch (error) {
      console.error("AHHH", error);
    }
  };

  return (
    <>
      <div className="card mb-5">
        <div className="card-header">
          <span>{link.name}</span>
          <button
            className="btn pt-0 pb-0 ml-auto"
            onClick={() => toggleForm(link._id)}
          >
            Edit
          </button>
        </div>

        <div className="card-body">
          <a href={link.url}>{link.url}</a>
          <p>{link.description}</p>
        </div>

        <div className="card-footer">
          <button className="btn btn-warning me-2" onClick={toggleArchiveLink}>
            {!link.archived ? "Archive" : "UnArchive"}
          </button>
          <button className="btn btn-danger" onClick={togglePrompt}>
            Delete
          </button>
        </div>
      </div>

      <PromptModal
        handleClick={deleteLink}
        togglePrompt={togglePrompt}
        showPrompt={showPrompt}
      />
    </>
  );
}

LinkCard.propTypes = {
  link: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default LinkCard;
