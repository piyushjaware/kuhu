import Links from "./Links"
import Search from "./Search"
import Header from "./Header"
import SaveLinkPanel from "./SaveLinkPanel"
import {reactIsInDevMode, LocalStorage, handleLegacyData, getTestDataForDev} from '../utils/common'

import '../styles/app.scss'
import Tags from "./Tags"
import {Component} from "react"
import OnboardingGraphic from "./OnboardingGraphic"
import getStartedImage from "../assets/lets+get+started+image.png"
import {default as ls} from "../services/link-service";


class App extends Component {

    state = {

        // These props are NOT saved to storage
        saveLink: false,
        selectedTags: [],
        searchTerm: '',
        editMode: false,

        // These props are SAVED to storage
        onboardingComplete: false,
        tags: [],
        links: []
    }

    currentLinkToSave = {}

    localStorage = new LocalStorage()

    async componentDidMount() {
        let lightData = await this.loadLightDataFromStorage()
        this.setState(Object.assign(this.state, handleLegacyData(lightData)))
        let heavyData = await this.loadHeavyDataFromStorage()
        this.setState(Object.assign(this.state, handleLegacyData(heavyData)))
    }

    componentWillUnmount() {
        console.log("App unmounting")
    }

    async loadLightDataFromStorage() {
        let onboardingComplete = await this.localStorage.read('onboardingComplete') || false
        let tags = await this.localStorage.read('tags') || []
        // console.log("localStorage.read result", data)
        if (reactIsInDevMode()) {
            const testData = getTestDataForDev()
            onboardingComplete = testData.onboardingComplete
            tags = testData.tags
        }
        let data = {onboardingComplete, tags}
        return data
    }

    saveDataToStorage(state) {
        this.localStorage.save('onboardingComplete', state.onboardingComplete)
        if (state.tags.length) {
            this.localStorage.save('tags', state.tags)
        }
        if (state.links.length) {
            this.localStorage.save('links', state.links)
        }
    }

    async loadHeavyDataFromStorage() {
        let links = await this.localStorage.read('links') || []
        // console.log("localStorage.read result", data)
        if (reactIsInDevMode()) {
            const testData = getTestDataForDev()
            links = testData.links
        }
        let data = {links}
        return data
    }

    onOnboardingComplete = () => {
        let newState = Object.assign(this.state, {onboardingComplete: true})
        this.setState(newState)
    }

    onSaveLinkBtnClick = currentLinkToSave => {
        this.openSaveLinkPanel()
        this.currentLinkToSave = currentLinkToSave
        // todo remove this
        // console.log('localStorage.read', await this.localStorage.read('state'))
    }

    onTagClick = (tag) => {
        this.toggleTagSelection(tag)
    }

    onLinkClick = (e, link) => {
        e.preventDefault()
        this.updateLinkWeight(link)
        this.openUrlAsNewTab(link)
    }


    updateLinkWeight(link) {
        if (link.weight) {
            link.weight++
        } else {
            link.weight = 2 // 2 because the link has been clicked. Base weight is 1.
        }
        this.onLinkSave(link) // just call save here with the new weight
    }

    onSearchTermChange = (e, searchTerm) => {
        // update the search term
        this.setState(Object.assign(this.state, {searchTerm}))
    }

    onTagSave = (tag) => {
        // save tag and update state
        if (tag) {
            let newState
            if (tag.newTagName) { // save an existing renamed tag
                newState = this.getStateForRenamedTag(tag);
            } else if (this.tagAlreadyExists(tag) && !tag.newTagName) {
                return // don't do anything if tag with same name exists already
            } else { // fresh new tag
                newState = Object.assign(this.state, {tags: [...this.state.tags, tag]})
            }
            this.setState(newState)
        }
    }

    getStateForRenamedTag(tag) {
        let existingTags = this.state.tags
        let updatedTag = Object.assign({}, tag)
        const existingTagIndex = this.findTagIndex(existingTags, updatedTag);
        // merge new tag obj 
        this.reformatUpdatedTag(updatedTag);
        existingTags[existingTagIndex] = updatedTag;
        // propagate renamed tag change to links
        let updatedLinks = this.renameTagsInLinks(tag, updatedTag);
        return Object.assign(this.state, {tags: existingTags, links: updatedLinks})
    }

// reformats by removing temp fields and copying temp fields to original fields
    reformatUpdatedTag(updatedTag) {
        updatedTag.tagName = updatedTag.newTagName // copy new name to name field
        delete updatedTag.newTagName // remove this temporary property
    }

    renameTagsInLinks(existingTag, updatedTag) {
        let updatedLinks = this.state.links.map(link => {
            link.tags = link.tags.map(t => {
                if (t === existingTag.tagName) { // compare with old name
                    return updatedTag.tagName
                }
                return t
            })
            return link
        })
        return updatedLinks;
    }

    onLinkSave = (link) => {
        // close add link panel, save link and update state
        this.closeSaveLinkPanel()
        if (link) {
            let newState
            if (this.linkAlreadyExists(link)) {
                newState = this.getStateForEditedLink(link);
            } else {
                newState = Object.assign(this.state, {links: [...this.state.links, link]})
            }
            this.setState(newState)
        }
    }

    getStateForEditedLink(link) {
        let existingLinks = this.state.links
        const existingLinkIndex = this.findLinkIndex(existingLinks, link);
        existingLinks[existingLinkIndex] = link;
        return Object.assign(this.state, {links: existingLinks})
    }

    onLinkDelete = (linkToDelete) => {
        if (linkToDelete) {
            if (!this.linkAlreadyExists(linkToDelete)) {
                return
            }
            const filterRemaining = (l) => !this.areLinksEqual(l, linkToDelete)
            let newState = Object.assign(this.state, {links: this.state.links.filter(filterRemaining)})
            this.setState(newState)
        }
    }

    onEditSelect = () => {
        let newState = Object.assign(this.state, {editMode: true})
        this.setState(newState)
    }

    onEditExit = () => {
        let newState = Object.assign(this.state, {editMode: false})
        this.setState(newState)
    }


    tagAlreadyExists(tag) {
        return !!this.findTag(this.state.tags, tag)
    }

    linkAlreadyExists(link) {
        return !!ls.findLink(this.state.links, link)
    }

    findTag(tags, tag) {
        return tags.find((t) => t.tagName === tag.tagName)
    }

    findTagIndex(tags, tag) {
        return tags.findIndex((t) => t.tagName === tag.tagName)
    }

    findLinkIndex(links, link) {
        return links.findIndex((l) => l.url === link.url)
    }

    areLinksEqual(l1, l2) {
        return l1.url === l2.url
    }

    onLinkSaveCancel = () => {
        this.closeSaveLinkPanel()
    }

    openSaveLinkPanel() {
        this.setState(Object.assign(this.state, {saveLink: true}))
    }

    closeSaveLinkPanel() {
        let newState = Object.assign(this.state, {saveLink: false})
        this.setState(newState)
    }

    toggleTagSelection(tag) {
        let currentSelectedTags = this.state.selectedTags
        if (currentSelectedTags.includes(tag.tagName)) { // selected tag was clicked. In that case toggle 
            this.setState(Object.assign(this.state, {selectedTags: currentSelectedTags.filter((t) => t !== tag.tagName)}))
            return
        }
        this.setState(Object.assign(this.state, {selectedTags: [...currentSelectedTags, tag.tagName]}))
    }

    openUrlAsNewTab(link) {
        window.open(link.url, '_blank').focus()
    }

    filterLinksBySearchTerm() {
        return this.state.links
            .filter(link =>
                JSON.stringify(link)
                    .toUpperCase()
                    .includes(this.state.searchTerm.toUpperCase()))
            .sort(this.sortLinks)
    }

    filterLinksByTag() {
        return this.state.links
            .filter(link => {
                let match = false;
                for (let linkTag of link.tags) {
                    if (this.state.selectedTags.includes(linkTag)) {
                        match = true;
                        break;
                    }
                }
                return match;
            })
            .sort(this.sortLinks)
    }

    getAllLinks() {
        return this.state.links.sort(this.sortLinks)
    }

    sortLinks = (a, b) => b.weight || 1 - a.weight || 1 // by weight desc

    /**
     * Overriding the setState to also save the state to chrome storage in addition to setting the react state
     */
    setState(state, callback) {
        // console.log('saving state to localstorage', JSON.stringify(state))
        this.saveDataToStorage(state);
        super.setState(state, callback)
    }

    showOnboarding() {
        return this.noDataYet() && !this.state.onboardingComplete
    }

    render() {

        if (this.state.saveLink)
            return (
                <div className="app">
                    <SaveLinkPanel
                        existingLink={this.currentLinkToSave ? this.currentLinkToSave : {}}
                        onLinkSave={this.onLinkSave}
                        onLinkSaveCancel={this.onLinkSaveCancel}
                        tags={this.state.tags}
                        onTagSave={this.onTagSave}>
                    </SaveLinkPanel>
                </div>)


        if (this.state.searchTerm)
            return (
                <div className="app">
                    <Header onSaveBtnClick={this.onSaveLinkBtnClick} editMode={this.state.editMode} onEditSelect={this.onEditSelect} onEditExit={this.onEditExit}/>
                    <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
                    <Links links={this.filterLinksBySearchTerm()}
                           onLinkClick={this.onLinkClick}
                           editMode={this.state.editMode}
                           onLinkDelete={this.onLinkDelete}
                           onEditBtnClick={this.onSaveLinkBtnClick}></Links>
                </div>
            )

        if (this.showOnboarding())
            return (
                <OnboardingGraphic onComplete={this.onOnboardingComplete}></OnboardingGraphic>
            )

        return (
            <div className="app">
                <Header onSaveBtnClick={this.onSaveLinkBtnClick} editMode={this.state.editMode} onEditSelect={this.onEditSelect} onEditExit={this.onEditExit}/>
                <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
                {this.noDataYet() ?
                    (<div className="get-started-img">
                        <img src={getStartedImage} alt="Let's get started"/>
                        <p>Let's get started by saving a page!</p>
                    </div>) : null}
                <Tags selectedTags={this.state.selectedTags}
                      tags={this.state.tags}
                      onTagClick={this.onTagClick}
                      onTagSave={this.onTagSave}
                      editMode={this.state.editMode}
                ></Tags>
                <Links links={this.state.selectedTags.length ? this.filterLinksByTag() : this.getAllLinks()}
                       onLinkClick={this.onLinkClick}
                       editMode={this.state.editMode}
                       onLinkDelete={this.onLinkDelete}
                       onEditBtnClick={this.onSaveLinkBtnClick}></Links>
            </div>
        )
    }


    noDataYet() {
        let noDataYet = this.state.tags.length === 0 && this.state.links.length === 0
        return noDataYet;
    }

}

export default App