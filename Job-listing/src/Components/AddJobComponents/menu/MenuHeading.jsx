
const MenuHeading = ({ text, collapsed }) => {
    if (collapsed) return <div className="w-full h-[52px]"></div>;
    return <h2 className="text-2xl text-gray-400 mt-4">{text}</h2>;
};

export default MenuHeading;