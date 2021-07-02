let Button = ({ iconClass, label, onClick, classNames}) => {
    return (
        <button className={`ui icon  ${label ? 'labeled' : ''} button ${classNames}`} onClick={() => onClick()}>
            {iconClass && <i className={`${iconClass} icon`}></i>}
            {label}
        </button>
    )
}
export default Button
