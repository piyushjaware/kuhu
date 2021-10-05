import '../styles/editable-link.scss'
import Link from './Link'
import IconButton from "./IconButton"
import SaveTag from "./SaveTag";
import {useState} from "react";
import Tag from "./Tag";

const EditableTag = ({tag, onTagSave}) => {

    const [tagToEdit, setTagToEdit] = useState("")

    const onEditButtonClick = () => {
        console.log("onEditButtonClick")
    }

    return (
        <div className="editable-tag">
            <IconButton iconName="edit icon" classNames="circular mini" onClick={onEditButtonClick}></IconButton>
            <Tag tag={tag}
                 onTagClick={() => {
                 }}
                 selected={false}></Tag>
        </div>
    )
}

export default EditableTag