import '../styles/links.scss'
import TruncatedText from "./TruncatedText";


const Link = ({links, onLinkClick}) => {

    const linksElemennts = links.map(link =>
        <article className="link-card" onClick={(e) => {
            onLinkClick(e, link)
        }} key={link.linkName}>
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
                    <img className="image" alt="logo" src={link.favIconUrl}/>
                </picture>
            </div>
        </article>
    )


    return (
        <section className="links">
            {linksElemennts}
        </section>
    )
}

export default Link;