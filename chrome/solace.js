function appendStyles(css, id) {
  const head = document.querySelector("head")
  let style
  const solaceTag = document.getElementById(`solace-${id}`)
  if (solaceTag) {
    console.log("existing solace tag")
    console.log(solaceTag)
    solaceTag.textContent = `${css}`
  } else {
    style = document.createElement("style")
    style.id = `solace-${id}`
    console.log("new solace tag")
    console.log(style)
    style.textContent = `${css}`
    head.appendChild(style)
  }
}

function removeStyles(css, id) {
  const solaceTag = document.getElementById(`solace-${id}`)
  solaceTag.remove()
}

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log({ request, sender })
  appendStyles(
    `div[data-testid="primaryColumn"] { display: none !important; }`,
    `twitter`
  )
})
