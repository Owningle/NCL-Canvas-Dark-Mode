chrome.storage.sync.get(['accentcolor'], function(result) {
    addStyle(':root{--secondary1: ' + result.accentcolor + ' !important}');
});

const addStyle = (() => {
    const style = document.createElement('style');
    document.head.append(style);
    return (styleString) => style.textContent = styleString;
})();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message.substring(0,3) == "col") {
          addStyle(':root{--secondary1: ' + request.message.substring(3) + ' !important}');
      }
    }
);