// eslint-disable-next-line no-unused-vars
const MenuItem = ({ Icon, label, collapsed, color , onClick}) => {
    return (
        <div
        className={`cursor-pointer p-3 rounded-lg flex items-center gap-4 
                    transition-all duration-200 
                    hover:text-[#d4a574] hover:bg-white/10 hover:translate-x-1 ${collapsed ? 'hover:scale-105' : ''}`}
        style={{color: color, opacity: "0.9"}}
        onClick={onClick}
        >
            <Icon className="text-[26px]" />
            {!collapsed && <h2 className="text-2xl font-bold">{label}</h2>}
        </div>
    );
};

export default MenuItem;