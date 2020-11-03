// Saves options to chrome.storage
function save_options() {
  var removeTwitterFeed = document.getElementById("removeTwitterFeed").checked
  var removeFacebookFeed = document.getElementById("removeFacebookFeed").checked
  var removeLinkedinFeed = document.getElementById("removeLinkedinFeed").checked
  var removeInstagramFeed = document.getElementById("removeInstagramFeed")
    .checked
  var activationKey = document.getElementById("activationKey").value
  chrome.storage.sync.set(
    {
      removeTwitterFeed,
      removeFacebookFeed,
      removeLinkedinFeed,
      removeInstagramFeed,
      activationKey,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status")
      status.textContent = "Preferences saved."
      validate_key()
      setTimeout(function () {
        status.textContent = ""
      }, 1250)
    }
  )
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
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
      document.getElementById("removeTwitterFeed").checked =
        items.removeTwitterFeed
      document.getElementById("removeFacebookFeed").checked =
        items.removeFacebookFeed
      document.getElementById("removeLinkedinFeed").checked =
        items.removeLinkedinFeed
      document.getElementById("removeInstagramFeed").checked =
        items.removeInstagramFeed
      document.getElementById("activationKey").value = items.activationKey
    }
  )
}

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

      if (authorized(items.activationKey)) {
        console.log("Authed!")
        activationKeyEl.setAttribute("class", "validated")
      } else {
        console.log("NOPE!")
        activationKeyEl.setAttribute("class", "invalidated")
        document
          .getElementById("proFeatures")
          .setAttribute("class", "deactivated")
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

document.addEventListener("DOMContentLoaded", restore_options)
document.getElementById("save").addEventListener("click", save_options)
document.addEventListener("DOMContentLoaded", validate_key)

feather && feather.replace()
