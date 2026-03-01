export const IOS_UNIVERSAL_LINK = 'https://app.thunderwod.com';
export const IOS_APP_STORE = 'https://apps.apple.com/app/thunderwod/id1607744328';
export const ANDROID_UNIVERSAL_LINK = 'https://app.thunderwod.com';
export const ANDROID_PLAY_STORE = 'https://play.google.com/store/apps/details?id=imok.thunderwod.app';
export const DESKTOP_URL = 'https://app.thunderwod.com/#/wod';

// Fallback to old names for compatibility
export const IOS_URL = IOS_APP_STORE;
export const ANDROID_URL = ANDROID_PLAY_STORE;

export function isDesktop() {
  const ua = navigator.userAgent || '';
  return !/android|iphone|ipad|ipod/i.test(ua);
}

export function getAppStoreUrl() {
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return ANDROID_URL;
  if (/iphone|ipad|ipod/i.test(ua)) return IOS_URL;
  return IOS_URL;
}

export function getMobileOrDesktopUrl() {
  const ua = navigator.userAgent || '';
  if (/android/i.test(ua)) return ANDROID_URL;
  if (/iphone|ipad|ipod/i.test(ua)) return IOS_URL;
  return DESKTOP_URL;
}

export function openAppStore() {
  window.open(getAppStoreUrl(), '_blank');
}

export function openAppWithFallback() {
  const ua = navigator.userAgent || '';
  
  if (/iphone|ipad|ipod/i.test(ua)) {
    // iOS: use App Store (universal links require server-side configuration)
    window.location.href = IOS_APP_STORE;
  } else if (/android/i.test(ua)) {
    // Android: try universal link, fallback to Play Store
    const appOpenedAt = Date.now();
    window.location.href = ANDROID_UNIVERSAL_LINK;
    
    const checkIfOpened = setTimeout(() => {
      if (Date.now() - appOpenedAt < 3000) {
        window.location.href = ANDROID_PLAY_STORE;
      }
    }, 2500);
    
    window.addEventListener('pagehide', () => clearTimeout(checkIfOpened), { once: true });
  } else {
    window.open(DESKTOP_URL, '_blank');
  }
}

export function openMobileOrDesktop() {
  const ua = navigator.userAgent || '';
  if (/android|iphone|ipad|ipod/i.test(ua)) {
    openAppWithFallback();
  } else {
    window.open(DESKTOP_URL, '_blank');
  }
}