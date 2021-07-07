import '../styles/search.scss'

const Search = ({searchTerm, onSearchTermChange}) => {
    return (
        <div className="ui fluid left icon input mbt10 search-field">
            <input autoFocus type="text" className="k-input" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchTermChange(e, e.target.value)}/>
            <i className="search icon "></i>
        </div>
    )
}

export default Search;