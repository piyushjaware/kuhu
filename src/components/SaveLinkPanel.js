import {useEffect, useState} from "react"
import Button from "./Button"
import Tags from "./Tags"
import "../styles/saveLinkPanel.scss"
import IconButton from "./IconButton";
import {reactIsInDevMode} from '../utils/common'
import SaveTag from "./SaveTag";
import Error from "./Error";
import React from 'react'

/**
 *
 * Param: existingLink: If present, the panel pre-populates fields from the link object
 * Fields prepopulated include name, chosenTags and tab
 * Only [linkName,tags] are editable
 *
 * @returns
 */
let SaveLinkPanel = ({existingLink = {}, onLinkSave, onLinkSaveCancel, tags, onTagSave}) => {

    const [chosenTags, setChosenTags] = useState(existingLink.tags || [])
    const [name, setName] = useState(existingLink.linkName || '')
    const [errors, setErrors] = useState([])
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

        if (!existingLink.url) { // skip if editing a link
            getCurrentTab().then(chromeTab => {
                setTab({
                    url: chromeTab.url,
                    desc: chromeTab.title, // map title to desc for now TODO: check if we can get desc later
                    favIconUrl: chromeTab.favIconUrl,
                })
            })
        } else {
            setTab({
                url: existingLink.url,
                desc: existingLink.desc, // map title to desc for now TODO: check if we can get desc later
                favIconUrl: existingLink.favIconUrl,
            })
        }
    }, [tab.url, existingLink])


    const onSave = () => {
        // setErrors('')// reset errors 
        if (!validateForm())
            return
        let linkToSave
        if (existingLink.url) { // editing
            linkToSave = Object.assign({}, existingLink, {linkName: name, tags: chosenTags})
        } else {
            linkToSave = {linkName: name, url: tab.url, tags: chosenTags, favIconUrl: tab.favIconUrl, desc: tab.desc}
        }
        onLinkSave(linkToSave)
    }

    const validateForm = () => {
        let validationSuccess = true;
        let validationErrors = [];
        if (!tab.url) {
            validationErrors.push({
                type: 'field',
                name: 'url',
                msg: 'There was some problem with extracting the current url from the browser tab.'
            })
            validationSuccess = false;
        }
        if (!name) {
            validationErrors.push({
                type: 'field',
                name: 'name',
                msg: <React.Fragment>Please provide a <b>name</b> for the page.</React.Fragment>
            })
            validationSuccess = false;
        }
        if (!chosenTags.length) {
            validationErrors.push({
                type: 'field',
                name: 'tagName',
                msg: <React.Fragment>Please choose one or more <b>tags</b> for the page.</React.Fragment>
            })
            validationSuccess = false;
        }
        if (!validationSuccess) {
            setErrors([...validationErrors])
        }

        return validationSuccess
    }


    const toggleTagSelection = (tag) => {
        if (chosenTags.includes(tag.tagName)) { // selected tag was clicked. In that case remove 
            setChosenTags(chosenTags.filter((t) => t !== tag.tagName))
            return
        }
        setChosenTags([...chosenTags, tag.tagName])
    }


    return (
        <div className="add-link-panel">

            <div className="title-row">
                <p className="title">Save Current Page</p>
                <IconButton iconName="close icon" classNames="circular tiny" onClick={onLinkSaveCancel}></IconButton>
            </div>
            <div className="form">
                <div className="k-field">
                    <div className="url">{tab.url}</div>
                </div>
                <div className="k-field mb20">
                    <label>Page Name</label>
                    <div className="ui small icon input">
                        <input autoFocus className="k-input" placeholder="eg. Google" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <Error errors={errors} name="name"></Error>
                </div>
                <div className="k-field mb20">
                    {!!tags.length && <label>Choose Tags</label>}
                    <Tags selectedTags={chosenTags}
                          tags={tags}
                          onTagClick={toggleTagSelection}
                          onTagSave={onTagSave}
                          allowAddTag={true}></Tags>
                    <Error errors={errors} name="tagName"></Error>
                    <SaveTag onTagSave={onTagSave} noTagsYet={!tags.length}></SaveTag>
                </div>
            </div>
            <Button label="Save Page" classNames="fluid k-btn-dark mt30" onClick={onSave}></Button>

        </div>
    )
}
export default SaveLinkPanel
