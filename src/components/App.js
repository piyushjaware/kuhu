/* eslint-disable no-undef */
import Button from "./Button";
import Links from "./Links";
import Search from "./Search";
import Header from "./Header";
import AddLinkPanel from "./AddLinkPanel";
import {reactIsInDevMode, LocalStorage} from '../utils/common'

import '../styles/app.scss'
import Tags from "./Tags";
import {Component} from "react";
import Logo from "./Logo";
import OnboardingGraphic from "./OnboardingGraphic";


class App extends Component {

    state = {
        addLink: false,
        selectedTag: '',
        searchTerm: '',
        onboardingComplete: false,
        tags: [],
        links: []
    }

    localStorage = new LocalStorage()

    async componentDidMount() {
        console.log("App mounting ")
        let data = await this.loadData();
        this.setState(Object.assign(this.state, data))
    }

    componentWillUnmount() {
        console.log("App unmounting")
    }

    async loadData() {

        let data = await this.localStorage.read('state')
        console.log("localStorage.read result", data)

        // Exempt a few fields from backup 
        for (const dataKey in data) {
            if (['addLink', 'selectedTag', 'searchTerm'].includes(dataKey)) {
                delete data[dataKey]
            }
        }

        if (reactIsInDevMode()) {
            data = await this.fetchDummyData()
            console.log("fetchDummyData", data)
        }
        return data
    }

    completeOnboarding = () => {
        let newState = Object.assign(this.state, {onboardingComplete: true});
        this.setState(newState);
    }

    onAddLinkBtnClick = async () => {
        this.openAddLinkPanel();
        // todo remove this
        console.log('localStorage.read', await this.localStorage.read('state'))
    }

    onTagClick = (tag) => {
        this.toggleTagSelection(tag);
    }

    onLinkClick = (e, link) => {
        e.preventDefault();
        this.updateLinkWeight(link);
        this.openUrlAsNewTab(link);
    }

    updateLinkWeight(link) {
        let newState = Object.assign(this.state);
        this.findLink(newState.links, link).weight++
        this.setState(newState)
    }

    onSearchTermChange = (e, searchTerm) => {
        // update the search term
        this.setState(Object.assign(this.state, {searchTerm}))
    }

    onTagSave = (tag) => {
        // save tag and update state
        if (tag) {
            if (this.tagAlreadyExists(tag)) {
                return;
            }
            let newState = Object.assign(this.state, {tags: [...this.state.tags, tag]});
            this.setState(newState)
        }
    }

    onLinkSave = (link) => {
        // close add link panel, save link and update state
        this.closeAddLinkPanel()
        if (link) {
            if (this.linkAlreadyExists(link)) {
                return;
            }
            let newState = Object.assign(this.state, {links: [...this.state.links, link]});
            this.setState(newState)
        }
    }

    tagAlreadyExists(tag) {
        return !!this.findTag(this.state.tags, tag);
    }

    linkAlreadyExists(link) {
        return !!this.findLink(this.state.links, link);
    }

    findTag(tags, tag) {
        return tags.find((t) => t.tagName === tag.tagName);
    }

    findLink(links, link) {
        return links.find((l) => l.url === link.url);
    }

    onLinkSaveCancel = () => {
        this.closeAddLinkPanel()
    }

    openAddLinkPanel() {
        this.setState(Object.assign(this.state, {addLink: true}))
    }

    closeAddLinkPanel() {
        let newState = Object.assign(this.state, {addLink: false});
        this.setState(newState)
    }

    toggleTagSelection(tag) {
        if (tag.tagName === this.state.selectedTag) { // selected tag was clicked. In that case toggle 
            this.setState(Object.assign(this.state, {selectedTag: ''}))
            return
        }
        this.setState(Object.assign(this.state, {selectedTag: tag.tagName}))
    }

    openUrlAsNewTab(link) {
        window.open(link.url, '_blank').focus();
    }

    filterLinksBySearchTerm() {
        return this.state.links
            .filter(link =>
                JSON.stringify(link)
                    .toUpperCase()
                    .includes(this.state.searchTerm.toUpperCase()))
            .sort(this.sortLinks);
    }

    filterLinksByTag() {
        return this.state.links
            .filter(link => link.tagName === this.state.selectedTag)
            .sort(this.sortLinks);
    }

    getAllLinks() {
        return this.state.links
            .sort(this.sortLinks);
    }

    sortLinks = (a, b) => b.weight - a.weight // by weight desc

    /**
     * Overriding the setState to also save the state to chrome storage in addition to setting the react state
     */
    setState(state, callback) {
        console.log('saving state to localstorage', JSON.stringify(state))
        this.localStorage.save('state', state) // save to storage after any state update
        super.setState(state, callback);
    }

    render() {
        console.log("render", Object.assign(this.state))

        const noDataYet = this.state.tags.length === 0 && this.state.links.length === 0

        if (this.state.addLink)
            return (
                <div className="app">
                    <Header>
                        <Logo></Logo>
                    </Header>
                    <AddLinkPanel
                        onLinkSave={this.onLinkSave}
                        onLinkSaveCancel={this.onLinkSaveCancel}
                        tags={this.state.tags}
                        onTagSave={this.onTagSave}>
                    </AddLinkPanel>
                </div>)

        if (this.state.searchTerm)
            return (
                <div className="app">
                    <Header>
                        <Logo></Logo>
                        <Button label="Save Page" classNames="k-btn-dark small">/</Button>
                    </Header>
                    <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
                    <Links links={this.filterLinksBySearchTerm()} onLinkClick={this.onLinkClick}></Links>
                </div>
            )

        if (noDataYet && !this.state.onboardingComplete)
            return (
                <OnboardingGraphic onComplete={this.completeOnboarding}></OnboardingGraphic>
            )

        return (
            <div className="app">
                <Header>
                    <Logo></Logo>
                    <Button label="Save Page" classNames="small k-btn-dark" onClick={this.onAddLinkBtnClick}>/</Button>
                </Header>
                <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange} autoFocus={!noDataYet}></Search>
                {noDataYet ?
                    (<div className="get-started-img">
                        <img src="https://kyp-art.s3.us-west-2.amazonaws.com/lets+get+started+image.png" alt="get started"/>
                        <p>Let's get started by saving a page!</p>
                    </div>) : null}
                <Tags selectedTag={this.state.selectedTag}
                      tags={this.state.tags}
                      onTagClick={this.onTagClick}
                      onTagSave={this.onTagSave}></Tags>
                <Links links={this.state.selectedTag ? this.filterLinksByTag() : this.getAllLinks()}
                       onLinkClick={this.onLinkClick}></Links>
            </div>
        )
    }


    async fetchDummyData() {
        return {
            "addLink": false,
            "selectedTag": "",
            "searchTerm": "",
            "onboardingComplete": true,
            "tags": [{"tagName": "shopping"}, {"tagName": "work"}, {"tagName": "code"}, {"tagName": "design"}, {"tagName": "cloud"}, {"tagName": "read"}],
            "links": [{
                "desc": "Amazon.com. Spend less. Smile more.",
                "favIconUrl": "https://www.amazon.com/favicon.ico",
                "linkName": "Amazon",
                "tagName": "shopping",
                "url": "https://www.amazon.com/",
            }, {
                "desc": "HTML semantics cheat sheet · Web Dev Topics · Learn the Web",
                "favIconUrl": "https://learn-the-web.algonquindesign.ca/favicon.ico",
                "linkName": "Semantic Html Tags",
                "tagName": "code",
                "url": "https://learn-the-web.algonquindesign.ca/topics/html-semantics-cheat-sheet/#text",
            }, {
                "desc": "Dribbble - Discover the World’s Top Designers & Creative Professionals",
                "favIconUrl": "https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico",
                "linkName": "Dribbble",
                "tagName": "design",
                "url": "https://dribbble.com/",
                "weight": 1
            }, {
                "desc": "Free Vectors, Stock Photos & PSD Downloads | Freepik",
                "favIconUrl": "https://freepik.cdnpk.net/img/favicons/favicon.ico?v=2018082101",
                "linkName": "Freepik",
                "tagName": "design",
                "url": "https://www.freepik.com/",
                "weight": 1
            }, {
                "desc": "Free Vector Icons and Stickers - PNG, SVG, EPS, PSD and CSS",
                "favIconUrl": "https://media.flaticon.com/dist/min/img/favicon.ico",
                "linkName": "Flaticon",
                "tagName": "design",
                "url": "https://www.flaticon.com/",
                "weight": 1
            }, {
                "desc": "Amazon Photos",
                "favIconUrl": "https://www.amazon.com/favicon.ico",
                "linkName": "Amazon Photos",
                "tagName": "cloud",
                "url": "https://www.amazon.com/photos/all?sort=sortDateUploaded",
                "weight": 1
            }, {
                "desc": "Amazon Drive",
                "favIconUrl": "https://images-na.ssl-images-amazon.com/images/G/01/digital/adrive/photos/webapp/favicon2.ico",
                "linkName": "Amazon Drive",
                "tagName": "cloud",
                "url": "https://www.amazon.com/clouddrive?ref=ap_usm_drive&mgh=1",
                "weight": 1
            }, {
                "desc": "Kindle: Your Notes and Highlights",
                "favIconUrl": "https://d3u8ewz6c11pt5.cloudfront.net/static/kp/2.42.4/b393d742cdd2/img/Notebook_Favicon.ico",
                "linkName": "Kindle HIghlights",
                "tagName": "read",
                "url": "https://read.amazon.com/notebook?ref_=kcr_notebook_lib",
                "weight": 1
            }]
        }
    }

}

export default App;