export const paste = (
  info: chrome.contextMenus.OnClickData,
  content: string,
  tab?: chrome.tabs.Tab
) => {
  chrome.tabs.sendMessage(tab?.id ?? 0, { data: content });
};

export const searchWiki = (url: string, query: any) => {
  query = query.selectionText;
  chrome.tabs.create({
    url: `${url}${query}`,
  });
};
