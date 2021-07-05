let Button = ({label, onClick, classNames}) => {
    return (
        <button className={`ui button ${classNames}`} onClick={() => onClick()}>
            {label}
        </button>

    )
}
export default Button
