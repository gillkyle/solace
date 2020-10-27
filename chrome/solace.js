function appendStyles(css) {
  const head = document.querySelector("head")
  let style
  const solaceTag = document.getElementById(`solace`)
  if (solaceTag) {
    console.log("existing solace tag")
    console.log(solaceTag)
    solaceTag.textContent = `${css}`
  } else {
    style = document.createElement("style")
    style.id = `solace`
    console.log("new solace tag")
    console.log(style)
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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log({ request, sender })
  chrome.storage.sync.get(
    {
      removeTwitterFeed: true
    },
    function (storage) {
      console.log(storage)
      if (request === `Inject`) {
        if (storage.removeTwitterFeed) appendStyles(twitterStyles)
      } else if (request === `Revert`) {
        removeStyles()
      }
    }
  )
})

// chrome.storage.sync.get(
//   {
//     twitter: true,
//   },
//   function (items) {
//     if(items.twitter) {
//       console.log("blah blah blah")
//       const feed = document.querySelector(`div[data-testid="primaryColumn"]`)
//       appendStyles(`div[data-testid="primaryColumn"] { display: none !important; }`)
//     }
//   }
// );
