export const APP_ROUTES = {
  'dock-phone': '/call',
  'dock-message': '/message',
  'dock-email': '/mail',
  'paymate-8': '/paymate',
  'yellow-10': '/yellowjack',
  'bleeter-6': '/bleeter',
  'fruit-7': '/fruitmarket',
  // "dock-camera": "/camera",
  // "settings-9": "/settings",
};

export function getAppRoute(appId) {
  return APP_ROUTES[appId] || null;
}
