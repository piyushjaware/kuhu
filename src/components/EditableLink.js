import '../styles/editable-link.scss'
import Link from './Link'
import IconButton from "./IconButton"

const EditableLink = ({ onDelete, link }) => {
    return (
        <section className="editable-link">
            <IconButton iconName="close icon" classNames="circular mini" onClick={() => { onDelete(link) }}></IconButton>
            <Link key={link.linkName} link={link} onLinkClick={() => { }}></Link>
        </section>
    )
}

export default EditableLink