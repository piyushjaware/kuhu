import '../styles/editable-tag.scss'
import IconButton from "./IconButton"
import SaveTag from "./SaveTag";
import {useState} from "react";
import Tag from "./Tag";

const EditableTag = ({tag, onTagSave}) => {

    const [tagToEdit, setTagToEdit] = useState("")

    const onEditButtonClick = () => {
        console.log("onEditButtonClick")
        setTagToEdit(true)
    }

    const onTagSaveClick = (tag) => {
        onTagSave(tag)
        setTagToEdit(false)
    }

    const onTagSaveCancelClick = () => {
        setTagToEdit(false)
    }

    return (
        <div className="editable-tag" key={tag.tagName + "_editable"}>
            {!tagToEdit
                ? <div>
                    <IconButton iconName="edit icon" classNames="circular mini" onClick={onEditButtonClick}></IconButton>
                    <Tag tag={tag}
                         onTagClick={() => {
                         }}
                         selected={false}> </Tag>
                </div>
                : <SaveTag existingTag={tag} onTagSave={onTagSaveClick} autoLaunch={true} onCancel={onTagSaveCancelClick}></SaveTag>}
        </div>
    )
}

export default EditableTag