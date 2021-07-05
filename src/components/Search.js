const Search = ({ searchTerm, onSearchTermChange }) => {
    return (
        <div className="ui fluid left icon input">
            <input autoFocus type="text" placeholder="Search..." value={searchTerm} onChange={(e) => onSearchTermChange(e, e.target.value)} />
            <i className="search icon "></i>
        </div>
    )
}

export default Search;