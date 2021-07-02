import './links.scss'


const Link = ({ links, onLinkClick }) => {

    const linksElemennts = links.map(link =>
        <a className="link-card" onClick={(e) => { onLinkClick(e, link) }} href="\" key={link.linkName}>
            <div className="content">
                <div className="text-section">
                    <div className="title">
                        {link.linkName}
                    </div>
                    <div className="description">
                        Dribbble - Discover the World’s Top Designers and Creative Professionals
                    </div>
                </div>
                <div className="image-section">
                    <img className="image" alt="some desc" src="https://cdn.dribbble.com/assets/dribbble-ball-192-23ecbdf987832231e87c642bb25de821af1ba6734a626c8c259a20a0ca51a247.png" />
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