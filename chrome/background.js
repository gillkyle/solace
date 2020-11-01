// these need to be an exact match to remove styles
const twitterUrlsToInject = [
  "https://twitter.com/home",
  "https://twitter.com/explore",
  "https://twitter.com/compose/tweet",
  "https://mobile.twitter.com/home",
]
const facebookUrlsToInject = [
  "https://www.facebook.com/",
  "https://m.facebook.com/",
]
const instagramUrlsToInject = [
  "https://www.instagram.com/",
  "https://www.instagram.com/explore/",
]
const linkedinUrlsToInject = ["https://www.linkedin.com/feed/"]
// not all urls cover changing urls, need to include titles since those can change in SPAs in some cases
const twitterTitlesToInject = ["Home / Twitter", "Explore / Twitter"]
const facebookTitlesToInject = ["Facebook"]

// a url only needs to contain these to revert styles
const urlsToRevert = [
  "https://twitter.com",
  "https://mobile.twitter.com",
  "https://www.facebook.com/",
  "https://m.facebook.com/",
  "https://www.linkedin.com/",
  "https://www.instagram.com/",
]

const inject = async site => {
  // console.log(`Injecting...`)
  const message = `Inject${site}`
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
  const twitterShouldInject =
    twitterUrlsToInject.includes(changeInfo.url) ||
    twitterTitlesToInject.includes(changeInfo.title)
  const facebookShouldInject =
    facebookUrlsToInject.includes(changeInfo.url) ||
    facebookTitlesToInject.includes(changeInfo.title)
  const linkedinShouldInject = linkedinUrlsToInject.includes(changeInfo.url)
  const instagramShouldInject = instagramUrlsToInject.includes(changeInfo.url)

  if (twitterShouldInject) {
    inject(`Twitter`)
  } else if (facebookShouldInject) {
    inject(`Facebook`)
  } else if (linkedinShouldInject) {
    inject(`Linkedin`)
  } else if (instagramShouldInject) {
    inject(`Instagram`)
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
    const twitterShouldInject =
      twitterUrlsToInject.includes(tab.url) ||
      twitterTitlesToInject.includes(tab.title)
    const facebookShouldInject =
      facebookUrlsToInject.includes(tab.url) ||
      facebookTitlesToInject.includes(tab.title)
    const linkedinShouldInject = linkedinUrlsToInject.includes(tab.url)
    const instagramShouldInject = instagramUrlsToInject.includes(tab.url)

    if (twitterShouldInject) {
      inject(`Twitter`)
    } else if (facebookShouldInject) {
      inject(`Facebook`)
    } else if (linkedinShouldInject) {
      inject(`Linkedin`)
    } else if (instagramShouldInject) {
      inject(`Instagram`)
    } else if (
      urlsToRevert.some(url => tab && tab.url && tab.url.includes(url))
    ) {
      revert()
    }
  })
})
