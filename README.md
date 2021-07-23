

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




