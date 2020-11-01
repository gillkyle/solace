function injectStyles(css) {
  const head = document.querySelector("head")
  let style
  const solaceTag = document.getElementById(`solace`)
  if (solaceTag) {
    // console.log("existing solace tag")
    solaceTag.textContent = `${css}`
  } else {
    // console.log("new solace tag")
    style = document.createElement("style")
    style.id = `solace`
    style.textContent = `${css}`
    head.appendChild(style)
  }
}

function removeStyles() {
  const solaceTag = document.getElementById(`solace`)
  if (solaceTag) {
    solaceTag.remove()
  }
}

const twitterStyles = `
div[data-testid="primaryColumn"] { 
  visibility: hidden !important; 
}
`

const facebookStyles = `
div[role="main"] { 
  display: none !important; 
}
`

const linkedinStyles = `
div[role="main"] > div:nth-child(n + 2) {
  display: none !important;
}
`

const instagramStyles = `
main[role="main"] {
  display: none !important;
}
`

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.get(
    {
      removeFacebookFeed: true,
      removeTwitterFeed: true,
      removeLinkedinFeed: true,
      removeInstagramFeed: true,
    },
    function (storage) {
      if (request === `InjectTwitter`) {
        injectStyles(`
          ${storage.removeTwitterFeed ? twitterStyles : ``}
        `)
      } else if (request === `InjectFacebook`) {
        injectStyles(`
          ${storage.removeFacebookFeed ? facebookStyles : ``}
        `)
      } else if (request === `InjectLinkedin`) {
        injectStyles(`
          ${storage.removeLinkedinFeed ? linkedinStyles : ``}
        `)
      } else if (request === `InjectInstagram`) {
        injectStyles(`
          ${storage.removeInstagramFeed ? instagramStyles : ``}
        `)
      } else if (request === `Revert`) {
        removeStyles()
      }
    }
  )
})

// Chrome Extensions don't have a good way to inject when refreshing, do so here
chrome.storage.sync.get(
  {
    removeFacebookFeed: true,
    removeTwitterFeed: true,
    removeLinkedinFeed: true,
    removeInstagramFeed: true,
  },
  function (storage) {
    switch (window.location.href) {
      case "https://www.facebook.com/":
        if (storage.removeFacebookFeed) injectStyles(facebookStyles)
        break
      case "https://www.linkedin.com/feed/":
        if (storage.removeLinkedinFeed) injectStyles(linkedinStyles)
        break
      case "https://www.instagram.com/":
        if (storage.removeInstagramFeed) injectStyles(instagramStyles)
        break
      case "https://www.instagram.com/explore":
        if (storage.removeInstagramFeed) injectStyles(instagramStyles)
        break
      case "https://twitter.com/home":
        if (storage.removeTwitterFeed) injectStyles(twitterStyles)
        break
      case "https://twitter.com/explore":
        if (storage.removeTwitterFeed) injectStyles(twitterStyles)
        break
      default:
        removeStyles()
    }
  }
)
