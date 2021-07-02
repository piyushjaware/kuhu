import Button from "./Button";
import Links from "./Links";
import Search from "./Search";
import Header from "./Header";
import AddLink from "./AddLink";

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
        this.setState(Object.assign(this.state, {
            tags: [
                { tagName: "design" },
                { tagName: "code" },
                { tagName: "work" },
                { tagName: "social" },
                { tagName: "games" }],

            links: [
                { linkName: "Dribble", tagName: "design", url: "https://dribbble.com/" },
                { linkName: "Color wheel", tagName: "design", url: "https://www.canva.com/colors/color-wheel/" },
                { linkName: "Freepik", tagName: "design", url: "https://www.freepik.com/" },
                { linkName: "Gradient Generator", tagName: "design", url: "https://cssgradient.io/" },
                { linkName: "Eloquent JS", tagName: "code", url: "https://eloquentjavascript.net/index.html" }
            ]
        }))
    }

    onTagClick = (e, tag) => {
        e.preventDefault();
        console.log("tag", tag)
        this.setState(Object.assign(this.state, { selectedTag: tag.tagName }))
    }

    onLinkClick = (e, link) => {
        e.preventDefault();
        window.open(link.url, '_blank').focus();
    }

    render() {

        console.log("render")

        if (this.state.addLink)
            return (
                <div className="App" >
                    <AddLink></AddLink>
                </div >)

        if (this.state.searchTerm)
            return (
                <div className="App" >
                    <Header>
                        <div className="logo"> Logo</div>
                        <Button label="Add Link" iconClass="plus">/</Button>
                    </Header>
                    <Search></Search>
                    <Links links={this.state.links} onLinkClick={this.onLinkClick}></Links>
                </div >
            )

        return (
            <div className="App" >
                <Header>
                    <div className="logo"> Logo</div>
                    <Button label="Add Link" iconClass="plus">/</Button>
                </Header>
                <Search></Search>
                <Tags selectedTag={this.state.selectedTag} tags={this.state.tags} onTagClick={this.onTagClick}></Tags>
                <Links links={this.state.links} onLinkClick={this.onLinkClick}></Links>
            </div >

        )
    }
}

export default App;