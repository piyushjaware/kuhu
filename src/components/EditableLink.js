import '../styles/editable-link.scss'
import Link from './Link'
import IconButton from "./IconButton"

const EditableLink = ({ onDelete, onEdit, link, onEditBtnClick }) => {
    return (
        <section className="editable-link">
            <IconButton iconName="close icon" classNames="circular mini" onClick={() => { onDelete(link) }}></IconButton>
            <IconButton iconName="edit  icon" classNames="circular mini" onClick={() => { onEditBtnClick(link) }}></IconButton>
            {/* <div className="link">edit|delete</div> */}
            {/* TODO : create big overlay add edit buttons on the link itslef */}
            <Link key={link.linkName} link={link} onLinkClick={() => { }}></Link>
        </section>
    )
}

export default EditableLink