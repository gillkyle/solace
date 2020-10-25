const urlsToClean = [
  "https://twitter.com/home",
  "https://mobile.twitter.com/home"
]
const urlsToRevert = ["https://twitter.com", "https://mobile.twitter.com"]

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (urlsToClean.includes(changeInfo.url)) {
    console.log(changeInfo.url)
    console.log({ tabId, changeInfo, tab })
    const message = "inject"
    chrome.tabs.sendMessage(tabId, message)
  } else if (
    urlsToRevert.some(
      url => changeInfo && changeInfo.url && changeInfo.url.includes(url)
    )
  ) {
    console.log("a similar page wahhhh!!")
  }
})

// chrome.browserAction.onClicked.addListener(() => {
//   // chrome.tabs.query({
//   //   currentWindow: true,
//   //   active: true
//   // }).then(sendMessageToTabs).catch(onError);
//   console.log("clicked icon")
// })
