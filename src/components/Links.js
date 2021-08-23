import '../styles/links.scss'
import Link from './Link'
import EditableLink from './EditableLink'


const Links = ({ links, onLinkClick, editMode, onLinkDelete }) => {

    return (
        <section className="links">
            {links.map(link =>
                editMode
                    ? <EditableLink key={link.linkName} link={link} onDelete={onLinkDelete}></EditableLink>
                    : <Link key={link.linkName} link={link} onLinkClick={onLinkClick}></Link>
            )}
        </section>
    )
}

export default Links;