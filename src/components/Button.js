let Button = ({ iconClass, label, onClick }) => {
    return (
        <button className="ui icon labeled button" onClick={() => onClick()}>
            {iconClass && <i className={`${iconClass} icon`}></i>}
            {label}
        </button>
    )
}
export default Button
    