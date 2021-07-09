import {useEffect, useState} from "react"
import Button from "./Button"
import Tags from "./Tags"
import "../styles/addLinkPanel.scss"
import IconButton from "./IconButton";
import {reactIsInDevMode} from '../utils/common'

let AddLinkPanel = ({onLinkSave, onLinkSaveCancel, tags, onTagSave}) => {

    const [chosenTag, setChosenTag] = useState({tagName: ''})
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [tab, setTab] = useState({})


    useEffect(() => {
        async function getCurrentTab() {
            if (reactIsInDevMode()) {
                return {url: "https://www.google.com", favIconUrl: "https://semantic-ui.com/images/logo.png", title: "Google"}
            }
            let queryOptions = {active: true, currentWindow: true};
            // eslint-disable-next-line no-undef
            let [tab] = await chrome.tabs.query(queryOptions);
            return tab;
        }

        getCurrentTab().then(chromeTab => {
            setTab({
                url: chromeTab.url,
                desc: chromeTab.title, // map title to desc for now TODO: check if we can get desc later
                favIconUrl: chromeTab.favIconUrl,
            })
        })
    }, [tab.url])


    const onSave = () => {
        setError('')// reset error 
        if (!validateLink()) return
        const linkToSave = {linkName: name, url: tab.url, tagName: chosenTag.tagName, favIconUrl: tab.favIconUrl, desc: tab.desc}
        onLinkSave(linkToSave)
    }

    const validateLink = () => {
        if (!tab.url) {
            setError("There was some problem with extracting the current url from the browser tab.")
            return false
        }
        if (!name) {
            setError("Please provide a name to the link.")
            return false
        }
        if (!chosenTag.tagName) {
            setError("Please choose a tag for the link.")
            return false
        }
        return true
    }

    console.log(chosenTag, tab, name, error)

    return (
        <div className="add-link-panel">

            <div className="title-row">
                <p className="title">Save Link</p>
                <IconButton iconName="close icon" classNames="circular tiny" onClick={onLinkSaveCancel}></IconButton>
            </div>
            <div className="form">
                <div className="k-field">
                    <div className="url">{tab.url}</div>
                </div>
                <div className="k-field mb20">
                    <label>Name</label>
                    <div className="ui small icon input">
                        <input autoFocus className="k-input" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div className="k-field mb20">
                    <label>Choose Tag</label>
                    <Tags selectedTag={chosenTag.tagName}
                          tags={tags}
                          onTagClick={setChosenTag}
                          onTagSave={onTagSave}
                          allowAddTag={true}></Tags>
                </div>
            </div>
            <div className="error">{error}</div>
            <Button label="Save Link" classNames="fluid k-btn-dark" onClick={onSave}>/</Button>

        </div>
    )
}
export default AddLinkPanel
