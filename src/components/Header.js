import '../styles/header.scss'
import Logo from "./Logo"
import Button from "./Button"

let Header = ({ showSaveBtn = true, onSaveBtnClick }) => {
    return (
        <div className="header">
            <Logo></Logo>
            {showSaveBtn && <Button label="Save Page" classNames="small k-btn-dark" onClick={onSaveBtnClick}>/</Button>}
        </div>
    )
}

export default Header