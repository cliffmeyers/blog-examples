// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

function checkForValidUrl(tabId, changeInfo, tab)
{
	// TODO: make URL checking more robust
	if (tab.url.indexOf('facebook.com/') > -1)
	{
		chrome.pageAction.show(tabId);
	}
}