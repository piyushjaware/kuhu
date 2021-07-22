import '../styles/links.scss'
import TruncatedText from "./TruncatedText";


const Link = ({links, onLinkClick}) => {

    const linksElemennts = links.map(link =>
        <a className="link-card" onClick={(e) => {
            onLinkClick(e, link)
        }} href="\" key={link.linkName}>
            <div className="content">
                <div className="text-section">
                    <div className="title">
                        <TruncatedText len={55}>{link.linkName}</TruncatedText>
                    </div>
                    <div className="description">
                        <TruncatedText len={55}>{link.desc}</TruncatedText>
                    </div>
                </div>
                <div className="image-section">
                    <img className="image" alt="logo" src={link.favIconUrl}/>
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