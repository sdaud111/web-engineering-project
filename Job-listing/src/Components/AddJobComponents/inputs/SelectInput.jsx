const SelectInput = ({ id, label, options = [], value, onChange }) => {
  return (
    <div className="flex gap-12 items-center">
      <label htmlFor={id} className="text-2xl font-semibold text-gray-500 w-1/4">
        {label}
      </label>

      <select
        id={id}
        name={id}
        value={value ?? ""}      
        onChange={(e) => onChange(e.target.value)}
        className={`
          border w-1/2 text-2xl px-6 py-4 rounded-md
          ${value ? "text-black border-blue-400" : "text-gray-500 border-gray-300"}
        `}
      >
        <option value="" disabled>Select {label}</option>

        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
