import { colors } from "../nav/colors";

const TextAreaInput = ({ id, label, placeholder, value, setValue }) => {
  return (
    <div className="flex flex-col h-full">
      <label
        htmlFor={id}
        className="text-2xl font-semibold mb-2"
        style={{ color: colors.mainLabelsText }}
      >
        {label}
      </label>

      <textarea
        id={id}
        name={id}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        className={`h-[40vh] px-6 py-4 rounded-md text-2xl resize-none w-full focus:outline-none`}
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: value ? "#4338CA" : "#1E1B4B",
          color: value ? "#000000" : "#1E1B4B",
        }}
      />
    </div>
  );
};

export default TextAreaInput;
