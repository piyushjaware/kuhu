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

        if (reactIsInDevMode()) {
            data = await this.fetchDummyData()
            console.log("fetchDummyData", data)
        }
        return data
    }


    async fetchDummyData() {
        return {
            tags: [
                {tagName: "design"},
                {tagName: "code"},
                {tagName: "social"},
                {tagName: "games"}
            ],

            links: [
                {
                    linkName: "Dribble",
                    tagName: "design",
                    url: "https://www.google.com",
                    favIconUrl: "https://www.google.com/favicon.ico",
                    desc: "some desc bjgj sbdjsbd msabdjsabjdbsajjkdbsa dmnsadgjsa dsamdbjksabd bjsbdj jjgj jkjkjk hjhjkk jhjkjk jhjkhjkh bjbjkbd sadjsdjksbjdgu jgjg"
                },
                // {linkName: "Color wheel", tagName: "design", url: "https://www.canva.com/colors/color-wheel/", favIconUrl: "https://www.google.com/favicon.ico", desc: "some desc"},
                // {linkName: "Freepik", tagName: "design", url: "https://www.freepik.com/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Eloquent JS", tagName: "code", url: "https://eloquentjavascript.net/index.html", favIconUrl: "", title: "", desc: ""}
            ]
        }
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
        this.openUrlAsNewTab(link);
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
        return this.state.tags.findIndex((t) => t.tagName === tag.tagName) > -1;
    }

    linkAlreadyExists(link) {
        return this.state.links.findIndex((l) => l.url === link.url) > -1;
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
        return this.state.links.filter(link =>
            JSON.stringify(link)
                .toUpperCase()
                .includes(this.state.searchTerm.toUpperCase()));
    }

    filterLinksByTag() {
        return this.state.links.filter(link => link.tagName === this.state.selectedTag);
    }

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
                <Links links={this.state.selectedTag ? this.filterLinksByTag() : this.state.links}
                       onLinkClick={this.onLinkClick}></Links>
            </div>
        )
    }

}

export default App;