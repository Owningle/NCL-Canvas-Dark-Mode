document.getElementById("accentcolor").addEventListener('input', function (evt) {
    update();
});

document.getElementById("accentcolor").addEventListener('focusout', function (evt) {
    saveSettings()
});

document.body.onload = function() {
    chrome.storage.sync.get(['accentcolor'], function(result) {
        document.getElementById("accentcolor").value = result.accentcolor;
    });
};

function saveSettings() {
    var storage = chrome.storage.sync;
    var colorvalue = accentcolor.value;

    storage.remove('accentcolor');
    storage.set({'accentcolor': colorvalue}, function() {
    });
};

function update() {
    var colorvalue = accentcolor.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "col" + colorvalue});
      });
}

const addStyle = (() => {
    const style = document.createElement('style');
    document.head.append(style);
    return (styleString) => style.textContent = styleString;
})();