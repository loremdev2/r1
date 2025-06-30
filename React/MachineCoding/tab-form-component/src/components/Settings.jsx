const Settings = ({ data, setData, errors }) => {
  const { settings } = data;
  const options = ["A", "B", "C", "D", "E", "F"];

  const toggle = (e) => {
    const { value, checked } = e.target;
    setData((p) => ({
      ...p,
      settings: checked
        ? [...p.settings, value]
        : p.settings.filter((s) => s !== value),
    }));
  };

  return (
    <div className="settings-elements">
      <label>Settings:</label>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="checkbox"
            value={opt}
            checked={settings.includes(opt)}
            onChange={toggle}
          />
          {opt}
        </label>
      ))}
      {errors.settings && (
        <div className="error">{errors.settings}</div>
      )}
    </div>
  );
};

export default Settings;
