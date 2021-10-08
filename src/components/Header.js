import '../styles/header.scss'
import Logo from "./Logo"
import Button from "./Button"
import {Dropdown} from "semantic-ui-react";

let Header = ({showSaveBtn = true, showOptions = true, onSaveBtnClick, editMode = false, onEditSelect, onEditExit}) => {

    function optionsDropdown() {
        return <Dropdown
            icon='ellipsis vertical'
            floating
            direction='left'
            className='icon k-dropdown'
        >
            <Dropdown.Menu>
                <Dropdown.Header icon='wrench' content='Kuhu'/>
                <Dropdown.Divider/>
                <Dropdown.Item icon='edit' text='Enter Edit Mode' onClick={onEditSelect}/>
            </Dropdown.Menu>
        </Dropdown>
    }

    if (editMode) {
        return (<div className="header">
                {showOptions && <Button label="Exit Edit Mode" classNames="small k-btn-dark fluid" onClick={onEditExit}>/</Button>}
            </div>
        )
    }
    return (
        <div className="header">
            <Logo></Logo>
            <div className="actions">
                {showSaveBtn && <Button label="Save Page" classNames="small k-btn-dark" onClick={onSaveBtnClick}>/</Button>}
                {showOptions && optionsDropdown()}
            </div>
        </div>
    )
}

export default Header