import {useEffect, useState} from "react"
import Button from "./Button"
import Tags from "./Tags"
import "../styles/addLinkPanel.scss"
import IconButton from "./IconButton";
import {reactIsInDevMode} from '../utils/common'
import AddTag from "./AddTag";
import Error from "./Error";
import React from 'react'


let AddLinkPanel = ({onLinkSave, onLinkSaveCancel, tags, onTagSave}) => {

    const [chosenTag, setChosenTag] = useState({tagName: ''})
    const [name, setName] = useState('')
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

        getCurrentTab().then(chromeTab => {
            setTab({
                url: chromeTab.url,
                desc: chromeTab.title, // map title to desc for now TODO: check if we can get desc later
                favIconUrl: chromeTab.favIconUrl,
            })
        })
    }, [tab.url])


    const onSave = () => {
        // setErrors('')// reset errors 
        if (!validateForm())
            return
        const linkToSave = {linkName: name, url: tab.url, tagName: chosenTag.tagName, favIconUrl: tab.favIconUrl, desc: tab.desc}
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
                msg: <React.Fragment>Please provide a <b>name</b> to the link.</React.Fragment>
            })
            validationSuccess = false;
        }
        if (!chosenTag.tagName) {
            validationErrors.push({
                type: 'field',
                name: 'tagName',
                msg: <React.Fragment>Please choose a <b>tag</b> for the link.</React.Fragment>
            })
            validationSuccess = false;
        }
        if (!validationSuccess) {
            setErrors([...validationErrors])
        }

        return validationSuccess
    }

    console.log(chosenTag, tab, name, errors)

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
                    <label>Name</label>
                    <div className="ui small icon input">
                        <input autoFocus className="k-input" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <Error errors={errors} name="name"></Error>
                </div>
                <div className="k-field mb20">
                    <label>Choose Tag</label>
                    <Tags selectedTag={chosenTag.tagName}
                          tags={tags}
                          onTagClick={setChosenTag}
                          onTagSave={onTagSave}
                          allowAddTag={true}></Tags>
                    <Error errors={errors} name="tagName"></Error>
                    <AddTag onTagSave={onTagSave} noTagsYet={!tags.length}></AddTag>
                </div>
            </div>
            <Button label="Save Link" classNames="fluid k-btn-dark" onClick={onSave}>/</Button>

        </div>
    )
}
export default AddLinkPanel
