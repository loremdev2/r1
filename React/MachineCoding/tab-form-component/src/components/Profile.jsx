const Profile = ({ data, setData, errors }) => {
  const { name, email, age, country, interests } = data;
  const interestOptions = ["coding", "music", "sports", "travel"];

  const handleDataChange = (e, field, type = "text") => {
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    setData((p) => ({ ...p, [field]: value }));
  };

  const handleInterestsChange = (e) => {
    const { value, checked } = e.target;
    setData((p) => ({
      ...p,
      interests: checked
        ? [...p.interests, value]
        : p.interests.filter((i) => i !== value),
    }));
  };

  return (
    <div className="profile-elements">
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleDataChange(e, "name")}
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => handleDataChange(e, "age")}
        />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => handleDataChange(e, "email")}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label>Country:</label>
        <select
          value={country}
          onChange={(e) => handleDataChange(e, "country")}
        >
          <option value="">Select Country</option>
          <option>America</option>
          <option>Brazil</option>
          <option>Costa Rica</option>
          <option>Dominican Republic</option>
          <option>India</option>
        </select>
        {errors.country && <div className="error">{errors.country}</div>}
      </div>
      <div>
        <label>Interests:</label>
        {interestOptions.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              value={opt}
              checked={interests.includes(opt)}
              onChange={handleInterestsChange}
            />
            {opt}
          </label>
        ))}
        {errors.interests && (
          <div className="error">{errors.interests}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
