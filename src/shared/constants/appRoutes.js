export const APP_ROUTES = {
  'dock-phone': '/call',
  'dock-message': '/message',
  'paymate-8': '/paymate',
  'yellow-10': '/yellowjack',
  'bleeter-6': '/bleeter',
  // "dock-camera": "/camera",
  // "settings-9": "/settings",
};

export function getAppRoute(appId) {
  return APP_ROUTES[appId] || null;
}
