import '../styles/header.scss'

let Header = (props) => {

    return (
        <div className="header">
            {props.children}
        </div>
    )
}

export default Header