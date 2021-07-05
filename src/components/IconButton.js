let IconButton = ({iconName, onClick, classNames}) => {
    return (
        <button className={`ui icon button ${classNames}`} onClick={() => onClick()}>
            <i className={`icon ${iconName}`}></i>
        </button>
    )
}
export default IconButton
