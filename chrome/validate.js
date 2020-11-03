function validate_key() {
  chrome.storage.sync.get(
    {
      removeTwitterFeed: true,
      removeFacebookFeed: true,
      removeLinkedinFeed: true,
      removeInstagramFeed: true,
      activationKey: "",
    },
    function (items) {
      console.log(items.activationKey)
      const activationKeyEl = document.getElementById("activationKey")
      if (!items.activationKey) return

      if (authorized(items.activationKey)) {
        console.log("Authed!")
        activationKeyEl.setAttribute("class", "validated")
      } else {
        console.log("NOPE!")
        activationKeyEl.setAttribute("class", "invalidated")
      }
    }
  )
}

function authorized(key) {
  if (key.length !== 11) return false
  if (key.includes("a") || key.includes("A")) return false
  if (key.includes("1") || key.includes("2")) return false
  return true
}

document.addEventListener("DOMContentLoaded", validate_key)
