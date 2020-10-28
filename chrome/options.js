// Saves options to chrome.storage
function save_options() {
  var removeTwitterFeed = document.getElementById("removeTwitterFeed").checked
  var removeFacebookFeed = document.getElementById("removeFacebookFeed").checked
  var removeLinkedinFeed = document.getElementById("removeLinkedinFeed").checked
  var removeInstagramFeed = document.getElementById("removeInstagramFeed")
    .checked
  chrome.storage.sync.set(
    {
      removeTwitterFeed,
      removeFacebookFeed,
      removeLinkedinFeed,
      removeInstagramFeed,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status")
      status.textContent = "Options saved."
      setTimeout(function () {
        status.textContent = ""
      }, 750)
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
    },
    function (items) {
      document.getElementById("removeTwitterFeed").checked =
        items.removeTwitterFeed
      document.getElementById("removeFacebookFeed").checked =
        items.removeFacebookFeed
      document.getElementById("removeLinkedinFeed").checked =
        items.removeLinkedinFeed
      document.getElementById("removeInstagramFeed").checked =
        items.removeInstagramFeed
    }
  )
}
document.addEventListener("DOMContentLoaded", restore_options)
document.getElementById("save").addEventListener("click", save_options)

feather && feather.replace()
