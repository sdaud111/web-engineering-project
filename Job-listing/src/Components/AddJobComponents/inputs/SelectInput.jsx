import { colors } from "../nav/colors";

const SelectInput = ({ id, label, options = [], value, onChange }) => {
  return (
    <div className="flex gap-12 items-center">
      <label htmlFor={id} className="text-2xl font-semibold w-1/4" style={{color: colors.mainLabelsText}}>
        {label}
      </label>

      <select
        id={id}
        name={id}
        value={value ?? ""}      
        onChange={(e) => onChange(e.target.value)}
        className={`
          border w-1/2 text-2xl px-6 py-4 rounded-md
          ${value ? "text-black border-[#4338CA]" : "text-gray-500 border-[#1E1B4B]"}
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
