import '../styles/tags.scss'
import EditableTag from "./EditableTag";
import Tag from "./Tag";

const Tags = ({selectedTags, tags, onTagClick, editMode, onTagSave}) => {

    return (
        <div className="tags">
            {tags.map(tag =>
                editMode
                    ? <EditableTag tag={tag} onTagSave={onTagSave}></EditableTag>
                    : <Tag tag={tag} onTagClick={onTagClick} selected={selectedTags.includes(tag.tagName)}></Tag>
            )}
        </div>
    )
}

export default Tags;