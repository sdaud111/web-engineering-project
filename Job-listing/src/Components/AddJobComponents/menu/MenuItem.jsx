// eslint-disable-next-line no-unused-vars
const MenuItem = ({ Icon, label, collapsed, color , onClick}) => {
    return (
        <div
        className={`cursor-pointer p-2 flex items-center gap-4 
                    transition-colors duration-200 
                    hover:text-[#d4a574] ${collapsed ? 'hover:scale-101' : ''}`}
        style={{color: color, opacity: "0.9"}}
        onClick={onClick}
        >
            <Icon className="text-[26px]" />
            {!collapsed && <h2 className="text-2xl font-bold hover:scale-100">{label}</h2>}
        </div>
    );
};

export default MenuItem;