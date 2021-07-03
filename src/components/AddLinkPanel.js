import { useEffect, useState } from "react"
import Button from "./Button"
import Tags from "./Tags"
// import "./tags.scss"

let AddLinkPanel = ({ onLinkSave, onLinkSaveCancel, tags, onTagSave }) => {

    const [chosenTag, setChosenTag] = useState({ tagName: '' })
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {
        const extractUrlFromTab = () => {
            return 'https://www.dribble.com/'
        }
        setUrl(extractUrlFromTab())
        console.log("extractUrlFromTab", url)
    }, [url])


    const onSave = () => {
        setError('')// reset error 
        if (!validateLink()) return
        const linkToSave = { linkName: name, url, tagName: chosenTag.tagName }
        onLinkSave(linkToSave)
    }

    const validateLink = () => {
        if (!url) {
            setError("There was some problem with extrcting the current url from the browser tab.")
            return false
        }
        if (!name) {
            setError("Please provide a name to the link?")
            return false
        }
        if (!chosenTag.tagName) {
            setError("Please provide a tag for the link.")
            return false
        }
        return true
    }

    console.log(chosenTag, url, name, error)

    return (
        <div className="add-link">
            <h2 className="title">Save Link</h2>
            <div className="link">{url}</div>
            <div className="ui form">
                <div className="field">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>
            <h3 className="sub-title">Choose Tag</h3>
            <Tags selectedTag={chosenTag.tagName}
                tags={tags}
                onTagClick={setChosenTag}
                onTagSave={onTagSave}></Tags>
            <div className="error">{error}</div>
            <Button label="Cancel" iconClass="cancel" onClick={onLinkSaveCancel}>/</Button>
            <Button label="Save Link" iconClass="save" onClick={onSave}>/</Button>

        </div>
    )
}
export default AddLinkPanel
