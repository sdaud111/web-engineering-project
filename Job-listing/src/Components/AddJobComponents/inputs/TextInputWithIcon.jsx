import { colors } from "../nav/colors";

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
      <label
        htmlFor={id}
        className="text-2xl font-semibold w-1/4"
        style={{ color: colors.mainLabelsText }}
      >
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
          className="w-full text-2xl px-12 py-4 rounded-md focus:outline-none"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: value ? "#4338CA" : "#1E1B4B",
            color: value ? "#000000" : "#1E1B4B",
          }}
        />
      </div>
    </div>
  );
};

export default TextInputWithIcon;
  