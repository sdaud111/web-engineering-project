
const MenuHeading = ({ text, collapsed, color }) => {
    if (collapsed) return <div className="w-full h-[52px]"></div>;
    return <h2 className={`text-2xl mt-4`} style={{color: color}}>{text}</h2>;
};

export default MenuHeading;