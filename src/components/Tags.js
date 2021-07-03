import AddTag from './AddTag'
import './tags.scss'

const Tags = ({ selectedTag, tags, onTagClick, onTagSave }) => {

    const tagElements = tags.map(tag =>
        <a role="button" className="tag" href="/" onClick={(e) => { e.preventDefault(); onTagClick(tag) }} key={tag.tagName}>
            <div className={`ui label ${selectedTag === tag.tagName ? 'selected' : ''}`} >{tag.tagName}</div>
        </a>
    )
    
    console.log('selectedTag', selectedTag)

    return (
       
        <div className="tags">
            {tagElements}
            <AddTag onTagSave={onTagSave} noTagsYet={!tags.length}></AddTag>
        </div>
    )
}

export default Tags;