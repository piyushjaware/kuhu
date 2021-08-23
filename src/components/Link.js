import '../styles/link.scss'
import TruncatedText from "./TruncatedText";


const Link = ({ link, onLinkClick }) => {

    return (
        <article className="link" onClick={(e) => { onLinkClick(e, link) }}>
            <div className="content">
                <div className="text-section">
                    <div className="title">
                        <TruncatedText len={40}>{link.linkName}</TruncatedText>
                    </div>
                    <aside className="description">
                        <TruncatedText len={40}>{link.desc}</TruncatedText>
                    </aside>
                </div>
                <picture className="image-section">
                    <img className="image" alt="logo" src={link.favIconUrl} />
                </picture>
            </div>
        </article>
    )
}

export default Link;