let Button = ({ iconClass, label }) => {
    return (
        <button className="ui icon labeled button">
            {iconClass && <i className={`${iconClass} icon`}></i>}
            {label}
        </button>
    )
}
export default Button
