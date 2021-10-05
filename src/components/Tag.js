import '../styles/link.scss'

const Tag = ({tag, onTagClick, selected}) => {
    return (
        <a role="button" className="tag" href="/" onClick={(e) => {
            e.preventDefault();
            onTagClick(tag)
        }} key={tag.tagName}>
            <div className={`ui label k-label ${selected ? 'selected' : ''}`}>{tag.tagName}</div>
        </a>
    )
}

export default Tag;