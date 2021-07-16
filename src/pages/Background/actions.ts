export const paste = (
  info: chrome.contextMenus.OnClickData,
  content: string,
  tab?: chrome.tabs.Tab
) => {
  chrome.tabs.sendMessage(tab?.id ?? 0, { data: content });
};

export const searchWiki = (query: any) => {
  query = query.selectionText;
  chrome.tabs.create({
    url:
      'https://dev-wiki.dynatrace.org/dosearchsite.action?cql=siteSearch+~+%22' +
      query +
      '%22&queryString=' +
      query,
  });
};
