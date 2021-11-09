# Kuhu   



How to run locally as a site?
``` sh
make install (first time only)
make run
```

### How to install extension locally on chrome based browsers?

First, run the below make targets
``` sh
make install (first time only)
make build
```

In chrome extensions page, choose `load unpacked` to create the extension in dev mode and point it to `chrome-extension` folder in project root.

The installed extension would refresh automatically everytime you do a `make build`. No need to refresh or reload the extension from chrome.

----
## Publishing Details

### Title
Kuhu - A Simple, Clean and Organized Bookmarks Manager

### Summary
Easily Save, Organize and Access Bookmarks! Filter by Tags, Search and Edit Quickly. Stay Private!


### Single purpose
Easily Save, Organize and Access Bookmarks!


### Description
With Kuhu, you can
- Save sites or pages you think you would need to retrieve later
- Quickly click and launch a saved page in a new tab
- Create tags to associate with the pages to keep them organized
- See all the pages in one place and easily search or filter by tags
- Easily edit/delete tags or pages

You will see pages sorted by how frequently you access them, so you can launch them even quicker!
All your data is private and stored locally in the browser, not sent to any servers!


### Permissions justification 
- activeTab:
Get the URL, title, and favicon for that tab using the chrome.tabs api.

- storage:
Store and retrieve user data in the local storage.




----

#### Handy things
##### Clear chrome sync storage
Do `chrome.storage.sync.clear()` in console.

##### Quickly get all the saved data from console
```bash
chrome.storage.local.get('state', result => console.log(JSON.stringify(result)))
```

----
