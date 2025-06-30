const Theme = ({ data, setData, errors }) => {
  const { theme } = data;
  const change = (e) => {
    setData((p) => ({
      ...p,
      theme: e.target.value,
    }));
  };

  return (
    <div className="theme-elements">
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === "dark"}
          onClick={change}
          readOnly
        />
        Dark
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === "light"}
          onClick={change}
          readOnly
        />
        Light
      </label>
      {errors.theme && <div className="error">{errors.theme}</div>}
    </div>
  );
};

export default Theme;
