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
  solaceTag.remove()
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.get(
    {
      removeFacebookFeed: true,
      removeTwitterFeed: true
    },
    function (storage) {
      if (request === `Inject`) {
        console.log("inject")
        injectStyles(`
          ${storage.removeTwitterFeed ? twitterStyles : ``}
          ${storage.removeFacebookFeed ? facebookStyles : ``}
        `)
      } else if (request === `Revert`) {
        console.log("revert")
        removeStyles()
      }
    }
  )
})

// Facebook doesn't have a good way to inject when refreshing, do so here
if (window.location.href === `https://www.facebook.com/`) {
  injectStyles(facebookStyles)
} else {
  removeStyles()
}
