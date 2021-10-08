

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






----

Single purpose
Save, Organize and Access Sites easily and quickly!

Description
The Kuhu extension allows to

- Save Sites or Pages you think you would need to retrieve later
- Quickly click and launch the saved page in a new tab
- Create tags to associate with the Pages to keep them organized
- See all the saved Pages and easily search or filter by tags
- Edit/delete tags or saved pages

You see pages sorted by how frequently you access them, so you can launch them even quicker!
All your data is stored locally in the browser and not sent to Kuhu servers!


Permission justification 

activeTab
Get the URL, title, and favicon for that tab using the chrome.tabs api.

storage
Store and retrieve user data in the local storage.