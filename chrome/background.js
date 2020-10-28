// these need to be an exact match to remove styles
const urlsToInject = [
  "https://twitter.com/home",
  "https://twitter.com/explore",
  "https://twitter.com/compose/tweet",
  "https://mobile.twitter.com/home",
  "https://www.facebook.com/",
  "https://m.facebook.com/",
  "https://www.instagram.com/",
  "https://www.instagram.com/explore/",
]
// not all urls cover changing urls, need to include titles since those can change in SPAs in some cases
const titlesToInject = ["Home / Twitter", "Explore / Twitter", "Facebook"]

// a url only needs to contain these to revert styles
const urlsToRevert = [
  "https://twitter.com",
  "https://mobile.twitter.com",
  "https://www.facebook.com/",
  "https://m.facebook.com/",
]

const inject = async () => {
  // console.log(`Injecting...`)
  const message = `Inject`
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}

const revert = async () => {
  // console.log(`Reverting...`)
  const message = `Revert`
  await new Promise(r => setTimeout(r, 250))
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log(`onUpdated`)
  // console.log({ changeInfo })
  const shouldInject =
    urlsToInject.includes(changeInfo.url) ||
    titlesToInject.includes(changeInfo.title)

  if (shouldInject) {
    inject()
  } else if (
    urlsToRevert.some(
      url => changeInfo && changeInfo.url && changeInfo.url.includes(url)
    )
  ) {
    revert()
  }
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
  // console.log(`onActivated`)
  // console.log(activeInfo)
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (urlsToInject.includes(tab.url)) {
      inject(activeInfo.tabId)
    } else if (
      urlsToRevert.some(url => tab && tab.url && tab.url.includes(url))
    ) {
      revert(activeInfo.tabId)
    }
  })
})

chrome.tabs.onReplaced.addListener(function (activeInfo) {
  // console.log(`onReplaced`)
  // console.log(activeInfo)
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (urlsToInject.includes(tab.url)) {
      inject(activeInfo.tabId)
    } else if (
      urlsToRevert.some(url => tab && tab.url && tab.url.includes(url))
    ) {
      revert(activeInfo.tabId)
    }
  })
})
