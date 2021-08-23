import '../styles/icon-btn.scss'

let IconButton = ({ iconName, onClick, classNames }) => {
    return (
        <a className={`icon-btn ${classNames}`} href="/" onClick={(e) => { e.preventDefault(); onClick() }}>
            <i className={`icon ${iconName}`}></i>
        </a>
    )
    
}
export default IconButton
