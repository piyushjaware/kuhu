import '../styles/search.scss'

const Search = ({searchTerm, onSearchTermChange, autoFocus = true}) => {
    return (
        <div className="search-field">
            <div className="ui fluid left icon input mbt10 ">
                <input autoFocus={autoFocus} type="text" className="k-input" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchTermChange(e, e.target.value)}/>
                <i className="search icon "></i>
            </div>
        </div>
    )
}

export default Search;