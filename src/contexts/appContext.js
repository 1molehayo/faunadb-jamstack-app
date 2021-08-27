import { createContext, useCallback, useContext, useState } from "react";
import { LINK_MODEL } from "../models/link";
import axios from "../services/axios";

const ContextDefaults = {
  form: {},
  links: [],
  loadLinks: null,
  setForm: null,
  showForm: false,
  toggleForm: null,
};

export const AppContext = createContext(ContextDefaults);

export const AppProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...LINK_MODEL });

  const loadLinks = useCallback(async () => {
    try {
      const { data } = await axios.get("/getLinks");
      setLinks(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const toggleForm = (id) => {
    if (id) {
      const obj = links.filter((item) => item._id === id)[0];
      setForm(obj);
    } else {
      setForm({ ...LINK_MODEL });
    }

    setShowForm((prevState) => !prevState);
  };

  return (
    <AppContext.Provider
      value={{ links, loadLinks, showForm, toggleForm, form, setForm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
