import { useState } from "react";
import Button from "./Button"

let AddTag = ({ onTagSave, noTagsYet }) => {

    const [tagName, setTagName] = useState('')
    const [inputMode, setInputMode] = useState(false)

    const onAddTagClick = () => {
        setInputMode(true);
    }
    const onSaveBtnClick = () => {
        console.log("Saving ", tagName)
        setTagName(''); //clear local tag
        setInputMode(false);
        onTagSave({ tagName })
    }

    return (

        <div className="add-tag">
            {inputMode
                ?
                <div className="ui action input">
                    <input type="text" value={tagName} placeholder="eg: work" onChange={(e) => setTagName(e.target.value.toLowerCase())} />
                    <Button iconClass="add" onClick={e => onSaveBtnClick()} >/</Button>
                </div>
                : <Button iconClass="plus" label={noTagsYet ? 'Add Tag' : ''} classNames="mini" onClick={e => onAddTagClick(e)}>/</Button>
            }
        </div>
    )
}
export default AddTag
