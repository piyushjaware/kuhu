import '../styles/tags.scss'

const Tags = ({selectedTags, tags, onTagClick}) => {

    const tagElements = tags.map(tag =>
        <a role="button" className="tag" href="/" onClick={(e) => {
            e.preventDefault();
            onTagClick(tag)
        }} key={tag.tagName}>
            <div className={`ui label k-label ${selectedTags.includes(tag.tagName) ? 'selected' : ''}`}>{tag.tagName}</div>
        </a>
    )

    return (
        <div className="tags">
            {tagElements}
        </div>
    )
}

export default Tags;