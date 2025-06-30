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
      const ageNum = parseInt(data.age);
      if (!data.age.trim()) {
        errs.age = "Age is required.";
      } else if (!/^[0-9]+$/.test(data.age)) {
        errs.age = "Age must be a number.";
      } else if (ageNum < 1 || ageNum > 120) {
        errs.age = "Age must be between 1 and 120.";
      }
      if (!data.email.trim()) {
        errs.email = "Email is required.";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
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
// Inside your TabForm component, before the return statement:
const handleTabClick = (targetTab) => {
  if (targetTab < activeTab) {
    // Allow going back without validation
    setErrors({});
    setActiveTab(targetTab);
  } else if (targetTab > activeTab) {
    // Validate current tab before moving forward
    const stepErrors = validate(data, activeTab);
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
    } else {
      setErrors({});
      setActiveTab(targetTab);
    }
  }
};

// ...later, in your JSX return:
{tabs.map((t, i) => (
  <h4
    key={i}
    onClick={() => handleTabClick(i)}
    className={i === activeTab ? "heading active" : "heading"}
    role="tab"
    tabIndex={0}
    aria-selected={i === activeTab}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleTabClick(i);
      }
    }}
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
