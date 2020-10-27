const urlsToInject = [
  "https://twitter.com/home",
  "https://twitter.com/explore",
  "https://twitter.com/compose/tweet",
  "https://mobile.twitter.com/home"
]
const titlesToInject = ["Home / Twitter", "Explore / Twitter"]
const urlsToRevert = ["https://twitter.com", "https://mobile.twitter.com"]

const inject = async tabId => {
  console.log(`Injecting...`)
  const message = `Inject`
  // chrome.tabs.sendMessage(tabId, message)
  // await new Promise(r => setTimeout(r, 3000))
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0])
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}

const revert = async tabId => {
  console.log(`Reverting...`)
  const message = `Revert`
  // chrome.tabs.sendMessage(tabId, message)
  // await new Promise(r => setTimeout(r, 3000))
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0])
    chrome.tabs.sendMessage(tabs[0].id, message)
  })
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(`onUpdated`)
  console.log({ changeInfo })
  if (
    urlsToInject.includes(changeInfo.url) ||
    titlesToInject.includes(changeInfo.title)
  ) {
    inject(tabId)
  } else if (
    urlsToRevert.some(
      url => changeInfo && changeInfo.url && changeInfo.url.includes(url)
    )
  ) {
    revert(tabId)
  }
})

chrome.tabs.onActivated.addListener(function (activeInfo) {
  console.log(`onActivated`)
  console.log(activeInfo)
  chrome.tabs.get(activeInfo.tabId, tab => {
    console.log({ tab })
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
  console.log(`onReplaced`)
  console.log(activeInfo)
  chrome.tabs.get(activeInfo.tabId, tab => {
    console.log({ tab })
    if (urlsToInject.includes(tab.url)) {
      inject(activeInfo.tabId)
    } else if (
      urlsToRevert.some(url => tab && tab.url && tab.url.includes(url))
    ) {
      revert(activeInfo.tabId)
    }
  })
})

// chrome.browserAction.onClicked.addListener(() => {
//   // chrome.tabs.query({
//   //   currentWindow: true,
//   //   active: true
//   // }).then(sendMessageToTabs).catch(onError);
//   console.log("clicked icon")
// })
