// TabForm.jsx
import { useState } from "react";
import { tabs } from "./tabsConfig";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    name: "",
    age: "",
    email: "",
    country: "",
    subscribed: false,
    interests: [],
    settings: [],
    theme: "",
  });
  const [errors, setErrors] = useState({});

  const ActiveTabComponent = tabs[activeTab].component;

  // validation rules by tab index
  const validate = (data, tabIndex) => {
    const errs = {};
    if (tabIndex === 0) {
      // Profile tab
      if (!data.name.trim()) errs.name = "Name is required.";
      if (!/^[0-9]+$/.test(data.age)) errs.age = "Age must be a number.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = "Email is invalid.";
      if (!data.country) errs.country = "Please select a country.";
      if (data.interests.length === 0)
        errs.interests = "Select at least one interest.";
    }
    if (tabIndex === 1) {
      // Settings tab
      if (data.settings.length === 0)
        errs.settings = "You must pick at least one setting.";
    }
    if (tabIndex === 2) {
      // Theme tab
      if (!data.theme) errs.theme = "Choose dark or light (or click again to unselect).";
    }
    return errs;
  };

  const handlePrevClick = () => {
    setErrors({}); // clear errors when going back
    setActiveTab((t) => t - 1);
  };

  const handleNextClick = () => {
    const stepErrors = validate(data, activeTab);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
    } else {
      setErrors({});
      setActiveTab((t) => t + 1);
    }
  };

  const handleSubmit = () => {
    const finalErrors = validate(data, activeTab);
    if (Object.keys(finalErrors).length) {
      setErrors(finalErrors);
    } else {
      console.log("Submitted data:", data);
      // … actually submit
    }
  };

  return (
    <div>
      <div className="heading-container">
        {tabs.map((t, i) => (
          <h4
            key={i}
            onClick={() => setActiveTab(i)}
            className={i === activeTab ? "heading active" : "heading"}
          >
            {t.name}
          </h4>
        ))}
      </div>
      <div className="tab-body">
        <ActiveTabComponent
          data={data}
          setData={setData}
          errors={errors}
        />
      </div>
      <div className="button-container">
        {activeTab > 0 && <button onClick={handlePrevClick}>Prev</button>}
        {activeTab < tabs.length - 1 && (
          <button onClick={handleNextClick}>Next</button>
        )}
        {activeTab === tabs.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TabForm;
