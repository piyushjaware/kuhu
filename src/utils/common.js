/* eslint-disable no-undef */
import React from "react";

export function reactIsInDevMode() {
    return '_self' in React.createElement('div');
}

export function truncate(str, len) {
    return str.length > len ? str.substring(0, len - 3) + '...' : str
}

export function handleLegacyData(data) {
    // let result = Object.assign({}, data);
    // result.links = result.links.map(tagNameToTags())
    // return result;

    return data;
}

// Mapper for mapping legacy tagName to tags
// function tagNameToTags() {
//     return l => {
//         l.tags = l.tags || []
//         if (l.tagName && !l.tags.includes(l.tagName)) {
//             l.tags.push(l.tagName)
//         }
//         delete l.tagName
//         return l
//     }
// }

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
        "onboardingComplete": true,
        "tags": [{"tagName": "shopping"}, {"tagName": "reading"}, {"tagName": "storage"}, {"tagName": "banking"}, {"tagName": "personal"}, {"tagName": "work"}, {"tagName": "social"}],
        "links": [{
            "desc": "Etsy - Shop for handmade, vintage, custom, and unique gifts for everyone",
            "favIconUrl": "https://www.etsy.com/favicon.ico",
            "linkName": "Etsy",
            "tags": ["shopping"],
            "url": "https://www.etsy.com/?utm_source=google&utm_medium=cpc&utm_term=etsy_e&utm_campaign=Search_US_Brand_GGL_ENG_General-Brand_Core_All_Exact&utm_ag=A1&utm_custom1=_k_Cj0KCQjwnoqLBhD4ARIsAL5JedLAhL53JPQLclmLyFmVABLV37rDImhCiy2-MhoS27L3eO6sSNpZHfkaAo0gEALw_wcB_k_&utm_content=go_227553629_16342445429_536666953103_kwd-1818581752_c_&utm_custom2=227553629&gclid=Cj0KCQjwnoqLBhD4ARIsAL5JedLAhL53JPQLclmLyFmVABLV37rDImhCiy2-MhoS27L3eO6sSNpZHfkaAo0gEALw_wcB"
        }, {
            "desc": "Amazon.com. Spend less. Smile more.",
            "favIconUrl": "https://www.amazon.com/favicon.ico",
            "linkName": "Amazon",
            "tags": ["shopping"],
            "url": "https://www.amazon.com/"
        }, {
            "desc": "Target : Expect More. Pay Less.",
            "favIconUrl": "https://assets.targetimg1.com/static/images/favicon-32x32.png",
            "linkName": "Target",
            "tags": ["shopping"],
            "url": "https://www.target.com/"
        }, {
            "desc": "Wish - Shopping Made Fun",
            "favIconUrl": "https://main.cdn.wish.com/web/a3071a6f6894/cozy/desktop/assets/icon/WishFavicon.png",
            "linkName": "Wish",
            "tags": ["shopping"],
            "url": "https://www.wish.com/"
        }, {
            "desc": "Whole Foods Market | Whatever Makes You Whole",
            "favIconUrl": "https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/sales_flyer/img/favicon_32x32.png",
            "linkName": "WholeFoods",
            "tags": ["shopping"],
            "url": "https://www.wholefoodsmarket.com/"
        }, {
            "desc": "Walmart.com | Save Money. Live Better",
            "favIconUrl": "https://www.walmart.com/favicon.ico",
            "linkName": "Walmart",
            "tags": ["shopping"],
            "url": "https://www.walmart.com/"
        }, {
            "desc": "Goodreads | Meet your next favorite book",
            "favIconUrl": "https://www.goodreads.com/favicon.ico",
            "linkName": "Good Reads",
            "tags": ["reading"],
            "url": "https://www.goodreads.com/"
        }, {
            "desc": "Kindle Cloud Reader",
            "favIconUrl": "https://m.media-amazon.com/images/G/01/kindle/weblibrary/k_favicon._CB1198675309_.png",
            "linkName": "Kindle Library",
            "tags": ["reading"],
            "url": "https://read.amazon.com/kindle-library"
        }, {
            "desc": "Kindle: Your Notes and Highlights",
            "favIconUrl": "https://d3u8ewz6c11pt5.cloudfront.net/static/kp/2.53.85/9747b8f1ad93/img/Notebook_Favicon.ico",
            "linkName": "Kindle Highlights",
            "tags": ["reading"],
            "url": "https://read.amazon.com/notebook?ref_=kcr_notebook_lib&language=en-US"
        }, {
            "desc": "Welcome to Open Library | Open Library",
            "favIconUrl": "https://openlibrary.org/static/images/openlibrary-128x128.png",
            "linkName": "Open Library",
            "tags": ["reading"],
            "url": "https://openlibrary.org/"
        }, {
            "desc": "Free eBooks | Project Gutenberg",
            "favIconUrl": "https://www.gutenberg.org/gutenberg/favicon.ico?v=1.1",
            "linkName": "Project Gutenberg",
            "tags": ["reading"],
            "url": "https://www.gutenberg.org/"
        }, {
            "desc": "Book Cover Archive",
            "favIconUrl": "http://bookcoverarchive.com/favicon.ico",
            "linkName": "Books Archive",
            "tags": ["reading"],
            "url": "http://bookcoverarchive.com/"
        }, {
            "desc": "Amazon Drive",
            "favIconUrl": "https://images-na.ssl-images-amazon.com/images/G/01/digital/adrive/photos/webapp/favicon2.ico",
            "linkName": "Amazon Drive",
            "tags": ["storage"],
            "url": "https://www.amazon.com/clouddrive"
        }, {
            "desc": "Amazon Photos",
            "favIconUrl": "https://www.amazon.com/favicon.ico",
            "linkName": "Amazon Photos",
            "tags": ["storage"],
            "url": "https://www.amazon.com/photos/welcome"
        }, {
            "desc": "Files - Dropbox",
            "favIconUrl": "https://cfl.dropboxstatic.com/static/images/favicon-vfl8lUR9B.ico",
            "linkName": "Dropbox",
            "tags": ["storage"],
            "url": "https://www.dropbox.com/home"
        }, {
            "desc": "My Drive - Google Drive",
            "favIconUrl": "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
            "linkName": "Google Drive",
            "tags": ["storage"],
            "url": "https://drive.google.com/drive/u/0/my-drive"
        }]
    }
}


