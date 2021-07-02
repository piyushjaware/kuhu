import './tags.scss'

const Tags = ({ selectedTag, tags, onTagClick }) => {

    const tagElements = tags.map(tag =>
        <a role="button" className="tag" href="/" onClick={(e) => { onTagClick(e, tag) }} key={tag.tagName}>
            <div className={`ui label ${selectedTag === tag.tagName ? 'selected' : ''}`} >{tag.tagName}</div>
        </a>
    )

    return (
        <div className="tags">
            {tagElements}
        </div>
    )
}

export default Tags;