

no split proto (not working yet)
Add this to package.json
`node ./scripts/build-non-split.js`



export files for extension
make build-ext

# Kuhu   


Choose `load unpacked` in chrome extensions to create the extension in dev mode.
To build the extension, just do `make build` and then resources should be available in the  `chrome-extension` folder in project root.
This should refresh extension automatically. No need to refresh or reload the extension from chrome.


Clear chrome sync storage
Do `chrome.storage.sync.clear()` in console.



The onboarding screens are full svgs that span the whole viewport. They are exported directly from the xd Kuhu project.



Quickly get all the saved data from console
```bash
chrome.storage.local.get('state', result => console.log(JSON.stringify(result)))
```


----

Title
Kuhu - A Simple, Clean and Organized Bookmarks Manager

Summary
Easily Save, Organize and Access Bookmarks! Filter by Tags, Search and Edit Quickly. Stay Private!


Single purpose
Easily Save, Organize and Access Bookmarks!


Description

With Kuhu, you can
- Save sites or pages you think you would need to retrieve later
- Quickly click and launch a saved page in a new tab
- Create tags to associate with the pages to keep them organized
- See all the pages in one place and easily search or filter by tags
- Easily edit/delete tags or pages

You will see pages sorted by how frequently you access them, so you can launch them even quicker!
All your data is private and stored locally in the browser, not sent to any servers!


Permission justification 

activeTab
Get the URL, title, and favicon for that tab using the chrome.tabs api.

storage
Store and retrieve user data in the local storage.