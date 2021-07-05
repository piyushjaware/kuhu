import './links.scss'


const Link = ({links, onLinkClick}) => {

    const linksElemennts = links.map(link =>
        <a className="link-card" onClick={(e) => {
            onLinkClick(e, link)
        }} href="\" key={link.linkName}>
            <div className="content">
                <div className="text-section">
                    <div className="title">
                        {link.linkName}
                    </div>
                    <div className="description">
                        {link.desc}
                    </div>
                </div>
                <div className="image-section">
                    <img className="image" alt="some desc" src={link.favIconUrl}/>
                </div>

            </div>
        </a>
    )

    return (
        <div className="links">
            {linksElemennts}
        </div>
    )
}

export default Link;