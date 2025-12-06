const TextInputWithIcon = ({
  id,
  label,
  placeholder,
  Icon,
  iconColor = "black",
  value,
  setValue
}) => {
  return (
    <div className="flex gap-12 items-center">
      <label htmlFor={id} className="text-2xl font-semibold text-gray-500 w-1/4">
        {label}
      </label>

      <div className="relative w-1/2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {Icon && <Icon className="text-2xl" style={{ color: iconColor }} />}
        </div>

        <input
          type="text"
          id={id}
          name={id}
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`
            border w-full text-2xl px-12 py-4 rounded-md
            ${value ? "text-black border-blue-400" : "text-gray-500 border-gray-300"}
            focus:outline-none focus:ring-2 focus:ring-blue-400
          `}
        />
      </div>
    </div>
  );
};

export default TextInputWithIcon;
