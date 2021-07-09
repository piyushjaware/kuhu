/* eslint-disable no-undef */
import Button from "./Button";
import Links from "./Links";
import Search from "./Search";
import Header from "./Header";
import AddLinkPanel from "./AddLinkPanel";
import {reactIsInDevMode} from '../utils/common'

import '../styles/app.scss'
import Tags from "./Tags";
import {Component} from "react";
import Logo from "./Logo";

class App extends Component {

    state = {
        addLink: false,
        selectedTag: '',
        searchTerm: '',
        tags: [],
        links: []
    }

    async componentDidMount() {
        console.log("App mounting ")
        let data = await this.loadData();
        this.setState(Object.assign(this.state, data))
    }

    componentWillUnmount() {
        console.log("App unmounting")
        // this.saveToStorage() this does not work as pop closes before componentWillUnmount is called
    }

    async loadData() {
        let data = await this.readFromStorage('state')
        console.log("readFromStorage result", data)

        if (data) {
            return data
        }
        data = await this.fetchDataFromApi()
        console.log("fetchDataFromApi", data)
        return data
    }


    readFromStorage(key) {
        if (reactIsInDevMode()) {
            console.log('React is in dev mode. Skipping readFromStorage')
            return Promise.resolve('')
        }
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get([key], function (result) {
                console.log('Value currently is ' + result[key]);
                if (result[key]) {
                    resolve(result[key]);
                } else {
                    resolve('');
                }

            });
        })
    }

    saveToStorage(state) {
        if (reactIsInDevMode()) {
            console.log('React is in dev mode. Skipping saveToStorage')
            return;
        }
        chrome.storage.sync.set({state: state}, function () {
            if (chrome.runtime.error) {
                console.log("Runtime error while saving data.");
            }
            console.log(`Value for 'state' set to  ${JSON.stringify(dataTostore)}`);
        });
    }

    async fetchDataFromApi() {
        return {
            tags: [
                // {tagName: "design"},
                {tagName: "code"},
                {tagName: "social"},
                // {tagName: "games"}
            ],

            links: [
                {
                    linkName: "Dribble",
                    tagName: "design",
                    url: "https://dribbble.com/",
                    favIconUrl: "https://www.google.com/favicon.ico",
                    desc: "some desc bjgj sbdjsbd msabdjsabjdbsajjkdbsa dmnsadgjsa dsamdbjksabd bjsbdj jjgj jkjkjk hjhjkk jhjkjk jhjkhjkh bjbjkbd sadjsdjksbjdgu jgjg"
                },
                {linkName: "Color wheel", tagName: "design", url: "https://www.canva.com/colors/color-wheel/", favIconUrl: "https://www.google.com/favicon.ico", desc: "some desc"},
                // {linkName: "Freepik", tagName: "design", url: "https://www.freepik.com/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/", favIconUrl: "", title: "", desc: ""},
                // {linkName: "Eloquent JS", tagName: "code", url: "https://eloquentjavascript.net/index.html", favIconUrl: "", title: "", desc: ""}
            ]
        }
    }

    onAddLinkBtnClick = () => {
        this.openAddLinkPanel();
        // todo remove this
        console.log('readFromStorage', this.readFromStorage('state'))
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
            let newState = Object.assign(this.state, {tags: [...this.state.tags, tag]});
            this.saveToStorage(newState)
            this.setState(newState)
        }
    }

    onLinkSave = (link) => {
        // close add link panel, save link and update state
        this.closeAddLinkPanel()
        if (link) {
            let newState = Object.assign(this.state, {links: [...this.state.links, link]});
            this.saveToStorage(newState) // save to storage after any save event
            this.setState(newState)
        }
    }

    onLinkSaveCancel = () => {
        this.closeAddLinkPanel()
    }

    openAddLinkPanel() {
        this.setState(Object.assign(this.state, {addLink: true}))
    }

    closeAddLinkPanel() {
        this.setState(Object.assign(this.state, {addLink: false}))
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

    render() {
        console.log("render", Object.assign(this.state))

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
                        <Button label="Add Link" classNames="k-btn-dark small">/</Button>
                    </Header>
                    <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
                    <Links links={this.filterLinksBySearchTerm()} onLinkClick={this.onLinkClick}></Links>
                </div>
            )

        return (
            <div className="app">
                <Header>
                    <Logo></Logo>
                    <Button label="Add Link" classNames="small k-btn-dark" onClick={this.onAddLinkBtnClick}>/</Button>
                </Header>
                <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
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