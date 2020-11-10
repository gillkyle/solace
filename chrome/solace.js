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

const solaceBackground = `background: center no-repeat url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120' fill='none'%3E%3Cg clip-path='url(%23clip0)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M60.2242 17.4332C36.5913 17.4332 17.4331 36.5915 17.4331 60.2244C17.4331 83.8573 36.5914 103.016 60.2242 103.016C83.8571 103.016 103.015 83.8573 103.015 60.2244C103.015 36.5915 83.8571 17.4332 60.2242 17.4332ZM60.2244 25.8056C51.2941 25.8056 43.8521 41.2155 43.8521 60.2246C43.8521 79.2337 51.8522 94.6436 60.2244 94.6436C79.2335 94.6436 94.6434 79.2337 94.6434 60.2246C94.6434 41.2155 79.2335 25.8056 60.2244 25.8056Z' fill='%23ACACAC'/%3E%3Ccircle cx='7.41735' cy='60' r='7.01098' fill='%23ACACAC'/%3E%3Ccircle cx='112.582' cy='60' r='7.01098' fill='%23ACACAC'/%3E%3Ccircle cx='60.0001' cy='7.41772' r='7.01098' transform='rotate(90 60.0001 7.41772)' fill='%23ACACAC'/%3E%3Ccircle cx='60.0001' cy='112.582' r='7.01098' transform='rotate(90 60.0001 112.582)' fill='%23ACACAC'/%3E%3Ccircle cx='22.8185' cy='97.1813' r='7.01098' transform='rotate(-45 22.8185 97.1813)' fill='%23ACACAC'/%3E%3Ccircle cx='97.1809' cy='22.8185' r='7.01098' transform='rotate(-45 97.1809 22.8185)' fill='%23ACACAC'/%3E%3Ccircle cx='22.8185' cy='22.8186' r='7.01098' transform='rotate(45 22.8185 22.8186)' fill='%23ACACAC'/%3E%3Ccircle cx='97.1815' cy='97.1814' r='7.01098' transform='rotate(45 97.1815 97.1814)' fill='%23ACACAC'/%3E%3Ccircle cx='11.5065' cy='80.3303' r='7.01098' transform='rotate(-22.7457 11.5065 80.3303)' fill='%23ACACAC'/%3E%3Ccircle cx='108.492' cy='39.6696' r='7.01098' transform='rotate(-22.7457 108.492 39.6696)' fill='%23ACACAC'/%3E%3Ccircle cx='39.6689' cy='11.5069' r='7.01098' transform='rotate(67.2543 39.6689 11.5069)' fill='%23ACACAC'/%3E%3Ccircle cx='80.3301' cy='108.493' r='7.01098' transform='rotate(67.2543 80.3301 108.493)' fill='%23ACACAC'/%3E%3Ccircle cx='40.0856' cy='108.665' r='7.01098' transform='rotate(-67.7457 40.0856 108.665)' fill='%23ACACAC'/%3E%3Ccircle cx='79.9136' cy='11.3343' r='7.01098' transform='rotate(-67.7457 79.9136 11.3343)' fill='%23ACACAC'/%3E%3Ccircle cx='11.3342' cy='40.0861' r='7.01098' transform='rotate(22.2543 11.3342 40.0861)' fill='%23ACACAC'/%3E%3Ccircle cx='108.665' cy='79.9137' r='7.01098' transform='rotate(22.2543 108.665 79.9137)' fill='%23ACACAC'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0'%3E%3Crect width='120' height='120' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E") !important;`

const twitterStyles = `
div[data-testid="primaryColumn"] { 
  visibility: hidden !important; 
}
div#react-root {
  ${solaceBackground}
}
`

const facebookStyles = `
div[role="main"] { 
  display: none !important; 
}
div[data-pagelet="page"] {
  ${solaceBackground}
}
`

const linkedinStyles = `
div[role="main"] > div:nth-child(n + 2) {
  display: none !important;
}
.neptune-grid {
  min-height: 100vh;
  ${solaceBackground}
}
`

const instagramStyles = `
main[role="main"] {
  display: none !important;
}
footer {
  display: none !important;
}
body > div > section {
  ${solaceBackground}
}
`

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.get(
    {
      removeFacebookFeed: true,
      removeTwitterFeed: true,
      removeLinkedinFeed: true,
      removeInstagramFeed: true,
      validKey: false,
    },
    function (storage) {
      if (request === `InjectTwitter`) {
        injectStyles(`
          ${storage.removeTwitterFeed ? twitterStyles : ``}
        `)
      } else if (request === `InjectFacebook` && storage.validKey) {
        injectStyles(`
          ${storage.removeFacebookFeed ? facebookStyles : ``}
        `)
      } else if (request === `InjectLinkedin` && storage.validKey) {
        injectStyles(`
          ${storage.removeLinkedinFeed ? linkedinStyles : ``}
        `)
      } else if (request === `InjectInstagram` && storage.validKey) {
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
    validKey: false,
  },
  function (storage) {
    switch (window.location.href) {
      case "https://www.facebook.com/":
        if (storage.removeFacebookFeed && storage.validKey)
          injectStyles(facebookStyles)
        break
      case "https://www.linkedin.com/feed/":
        if (storage.removeLinkedinFeed && storage.validKey)
          injectStyles(linkedinStyles)
        break
      case "https://www.instagram.com/":
        if (storage.removeInstagramFeed && storage.validKey)
          injectStyles(instagramStyles)
        break
      case "https://www.instagram.com/explore/":
        if (storage.removeInstagramFeed && storage.validKey)
          injectStyles(instagramStyles)
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
