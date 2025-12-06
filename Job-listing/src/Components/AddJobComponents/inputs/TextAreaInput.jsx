const TextAreaInput = ({ id, label, placeholder, value, setValue }) => {
  return (
    <div className="flex flex-col h-full">
      <label htmlFor={id} className="text-2xl font-semibold text-gray-500 mb-2">
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className={`
          h-[40vh] border px-6 py-4 rounded-md text-2xl resize-none w-full
          ${value ? "border-blue-400 text-black" : "border-gray-300 text-gray-500"}
          focus:outline-none focus:ring-2 focus:ring-blue-400
        `}
      />
    </div>
  );
};

export default TextAreaInput;
