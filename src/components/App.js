import Button from "./Button";
import Links from "./Links";
import Search from "./Search";
import Header from "./Header";
import AddLinkPanel from "./AddLinkPanel";

import './app.scss'
import Tags from "./Tags";
import { Component } from "react";

class App extends Component {

    state = {
        addLink: false,
        selectedTag: '',
        searchTerm: '',
        tags: [],
        links: []
    }

    componentDidMount() {
        console.log("App mounting ")
        this.setState(Object.assign(this.state, {
            tags: [
                // { tagName: "design" },
                // { tagName: "code" },
                // { tagName: "work" },
                // { tagName: "social" },
                // { tagName: "games" }
            ],

            links: [
                { linkName: "Dribble", tagName: "design", url: "https://dribbble.com/" },
                { linkName: "Color wheel", tagName: "design", url: "https://www.canva.com/colors/color-wheel/" },
                { linkName: "Freepik", tagName: "design", url: "https://www.freepik.com/" },
                { linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/" },
                { linkName: "Eloquent JS", tagName: "code", url: "https://eloquentjavascript.net/index.html" }
            ]
        }))
    }

    componentWillUnmount() {
        console.log("App unmounting")
    }

    onAddLinkBtnClick = () => {
        this.setState(Object.assign(this.state, { addLink: true }))
    }

    onTagClick = (e, tag) => {
        e.preventDefault();
        console.log("tag", tag)
        if (tag.tagName === this.state.selectedTag) { // selected tag was clicked. In that case toggle 
            this.setState(Object.assign(this.state, { selectedTag: '' }))
            return
        }
        this.setState(Object.assign(this.state, { selectedTag: tag.tagName }))
    }

    onLinkClick = (e, link) => {
        e.preventDefault();
        window.open(link.url, '_blank').focus();
    }

    onSearchTermChange = (e, searchTerm) => {
        // e.preventDefault();
        this.setState(Object.assign(this.state, { searchTerm }))
    }

    onTagSave = (tag) => {
        this.setState(Object.assign(this.state, { tags: [...this.state.tags, tag] }))
    }

    onLinkSave = () => {
        this.setState(Object.assign(this.state, { addLink: false }))
    }

    onLinkSaveCancel = () => {
        this.setState(Object.assign(this.state, { addLink: false }))
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

        console.log("render", this.state)

        if (this.state.addLink)
            return (
                <div className="App" >
                    <AddLinkPanel onLinkSave={this.onLinkSave} onLinkSaveCancel={this.onLinkSaveCancel}></AddLinkPanel>
                </div >)

        if (this.state.searchTerm)
            return (
                <div className="App" >
                    <Header>
                        <div className="logo"> Logo</div>
                        <Button label="Add Link" iconClass="plus">/</Button>
                    </Header>
                    <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
                    <Links links={this.filterLinksBySearchTerm()} onLinkClick={this.onLinkClick}></Links>
                </div >
            )

        return (
            <div className="App" >
                <Header>
                    <div className="logo"> Logo</div>
                    <Button label="Add Link" iconClass="plus" onClick={this.onAddLinkBtnClick}>/</Button>
                </Header>
                <Search searchTerm={this.state.searchTerm} onSearchTermChange={this.onSearchTermChange}></Search>
                <Tags selectedTag={this.state.selectedTag}
                    tags={this.state.tags}
                    onTagClick={this.onTagClick}
                    onTagSave={this.onTagSave}></Tags>
                <Links links={this.state.selectedTag ? this.filterLinksByTag() : this.state.links}
                    onLinkClick={this.onLinkClick}></Links>
            </div >

        )
    }
}

export default App;