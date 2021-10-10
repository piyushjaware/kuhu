/* eslint-disable no-undef */
import React from "react";

export function reactIsInDevMode() {
    return '_self' in React.createElement('div');
}

export function truncate(str, len) {
    return str.length > len ? str.substring(0, len - 3) + '...' : str
}

export function handleLegacyData(data) {
    let result = Object.assign({}, data);
    result.links = result.links.map(tagNameToTags())
    return result;
}

// Mapper for mapping legacy tagName to tags
function tagNameToTags() {
    return l => {
        l.tags = l.tags || []
        if (l.tagName && !l.tags.includes(l.tagName)) {
            l.tags.push(l.tagName)
        }
        delete l.tagName
        return l
    }
}

export class LocalStorage {


    read = (key) => {
        if (reactIsInDevMode()) {
            console.log('React is in dev mode. Skipping readFromStorage')
            return Promise.resolve('')
        }
        return new Promise((resolve, reject) =>
            chrome.storage.local.get(key, result =>
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve(result[key])
            )
        )
    }


    save(keyToSave, valueToSave) {
        if (reactIsInDevMode()) {
            console.log('React is in dev mode. Skipping saveToStorage')
            return;
        }
        let data = {}
        data[keyToSave] = valueToSave;

        return new Promise((resolve, reject) =>
            chrome.storage.local.set(data, () =>
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve()
            )
        )
    }
}


export function getTestDataForDev() {
    return {
        "saveLink": false,
        "selectedTags": [],
        "searchTerm": "",
        "onboardingComplete": true,
        "tags": [{"tagName": "shopping"}, {"tagName": "work"}, {"tagName": "code"}, {"tagName": "design"}, {"tagName": "cloud"}, {"tagName": "read"}],
        "links": [{
            "desc": "Amazon.com. Spend less. Smile more.",
            "favIconUrl": "https://www.amazon.com/favicon.ico",
            "linkName": "Amazon",
            "tagName": "shopping",
            "url": "https://www.amazon.com/",
            "weight": 10
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
            "linkName": "Kindle Highlights",
            "tagName": "read",
            "url": "https://read.amazon.com/notebook?ref_=kcr_notebook_lib",
            "weight": 1
        }]
    }
}


