const TextInput = ({ id, label, placeholder, value, setValue }) => {
  return (
    <div className="flex gap-12 items-center">
      <label htmlFor={id} className="text-2xl font-semibold text-gray-500 w-1/4">
        {label}
      </label>

      <input
        type="text"
        id={id}
        name={id}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`
          border w-1/2 text-2xl px-6 py-4 rounded-md
          ${value ? "text-black border-blue-400" : "text-gray-500 border-gray-300"}
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
      />
    </div>
  );
};

export default TextInput;
