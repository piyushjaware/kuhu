import {useState} from "react";
import Button from "./Button"
import IconButton from "./IconButton";
import "../styles/save-tag.scss"

/**
 *
 * Param: existingTag: If present, the panel pre-populates fields from the tag object
 * Fields prepopulated include tagName
 * Only [tagName] are editable
 *
 * @returns
 */
let SaveTag = ({existingTag = {}, onTagSave, autoLaunch = false, onCancel = ""}) => {

    const [tagName, setTagName] = useState(existingTag.tagName || '')
    const [inputMode, setInputMode] = useState(autoLaunch)
    const [error, setError] = useState('')

    const onAddTagClick = () => {
        setInputMode(true);
    }
    const onSaveBtnClick = () => {

        setError('')// reset error 
        if (!validateLink()) return
        setTagName(''); //clear local tag
        setInputMode(false);


        let tagToSave
        if (existingTag.tagName) { // editing
            tagToSave = {tagName: existingTag.tagName, newTagName: tagName}
        } else {
            tagToSave = {tagName}
        }
        onTagSave(tagToSave)
    }

    const validateLink = () => {
        if (!tagName) {
            setError("Tag name missing!")
            return false
        }
        return true
    }

    const onCancelClick = () => {
        if (onCancel) {
            onCancel()
        } else {
            setInputMode(false)
        }
    }

    return (
        <div className="save-tag tag">
            {inputMode
                ?
                <div className="save-tag-input-row">
                    <div className="ui input tiny">
                        <input autoFocus type="text" value={tagName} placeholder="eg: work" onChange={(e) => setTagName(e.target.value.toLowerCase())}/>
                    </div>
                    {/*<Button iconClass="add" classNames="save-tag-icon-btn" onClick={e => onSaveBtnClick()}>/</Button>*/}
                    <IconButton iconName="save" classNames="" onClick={e => onSaveBtnClick()}></IconButton>
                    <IconButton iconName="cancel" onClick={e => onCancelClick()}></IconButton>
                    <div className="error">{error}</div>
                </div>
                : <Button label="Create Tag" classNames="mini k-btn-dark hollow" onClick={e => onAddTagClick(e)}>/</Button>
            }
        </div>
    )
}

export default SaveTag
