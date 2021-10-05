import {useState} from "react";
import Button from "./Button"
import IconButton from "./IconButton";
import "../styles/save-tag.scss"

let SaveTag = ({onTagSave, noTagsYet}) => {

    const [tagName, setTagName] = useState('')
    const [inputMode, setInputMode] = useState(false)
    const [error, setError] = useState('')

    const onAddTagClick = () => {
        setInputMode(true);
    }
    const onSaveBtnClick = () => {

        setError('')// reset error 
        if (!validateLink()) return


        setTagName(''); //clear local tag
        setInputMode(false);
        onTagSave({tagName})
    }

    const validateLink = () => {
        if (!tagName) {
            setError("Tag name missing!")
            return false
        }
        return true
    }


    return (
        <div className="save-tag tag">
            {inputMode
                ?
                <div className="ui action input tiny">
                    <input autoFocus type="text" value={tagName} placeholder="eg: work" onChange={(e) => setTagName(e.target.value.toLowerCase())}/>
                    {/*<Button iconClass="add" classNames="save-tag-icon-btn" onClick={e => onSaveBtnClick()}>/</Button>*/}
                    <IconButton iconName="save" classNames="" onClick={e => onSaveBtnClick()}></IconButton>
                    <IconButton iconName="cancel" onClick={e => setInputMode(false)}></IconButton>
                </div>
                : <Button label="Create Tag" classNames="mini k-btn-dark hollow" onClick={e => onAddTagClick(e)}>/</Button>
            }
            <div className="error">{error}</div>
        </div>
    )
}

export default SaveTag
