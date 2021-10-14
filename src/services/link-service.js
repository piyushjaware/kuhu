const LinkService = {
    findLink(links, link) {
        console.log("called")
        return links.find((l) => l.url === link.url)
    }
}

export default LinkService