
// eslint-disable-next-line no-unused-vars
const MenuItem = ({ Icon, label, collapsed }) => {
    return (
        <div
        className={`p-2 flex items-center gap-4 text-gray-600 
                    transition-colors duration-200 
                    hover:text-blue-400 ${collapsed ? 'hover:scale-101' : ''}`}
        >
            <Icon className="text-[26px]" />
            {!collapsed && <h2 className="text-2xl font-bold hover:scale-100">{label}</h2>}
        </div>
    );
};

export default MenuItem;