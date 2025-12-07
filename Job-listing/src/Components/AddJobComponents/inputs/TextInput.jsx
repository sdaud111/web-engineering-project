import { colors } from "../nav/colors";

const TextInput = ({ id, label, placeholder, value, setValue }) => {
  return (
    <div className="flex gap-12 items-center">
      <label
        htmlFor={id}
        className="text-2xl font-semibold w-1/4"
        style={{ color: colors.mainLabelsText }}
      >
        {label}
      </label>

      <input
        type="text"
        id={id}
        name={id}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-1/2 text-2xl px-6 py-4 rounded-md focus:outline-none"
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

export default TextInput;
