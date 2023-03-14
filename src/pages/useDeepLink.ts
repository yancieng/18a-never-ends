import { useEffect } from 'react'

interface Params {
  onIgnored?: () => void
  onFallback?: () => void
  onReturn?: () => void
  openInNewTab?: boolean
}

/**
 * Deep link to a native app from a browser, with a fallback
 * As of on browser, it's not supports any API to detect installed app on device. So we workaround based on browser behavior (e.g: blur; visibilityChange; hide)
 */
const useDeepLink = ({ onIgnored, onFallback, onReturn, openInNewTab = false }: Params = {}): {
  openURL: (url: string) => void
  isAppInstalled: (url: string) => Promise<unknown>
} => {
  let hasFocus = true
  let didHide = false

  // window is blurred when dialogs are shown
  const onBlur = () => {
    hasFocus = false
  }

  // document is hidden when native app is shown or browser is backgrounded
  const onVisibilityChange = (evt: any) => {
    if (evt.target.visibilityState === 'hidden') {
      didHide = true
    }
  }

  // window is focused when dialogs are hidden, or browser comes into view
  const onFocus = () => {
    if (didHide) {
      onReturn && onReturn()
      didHide = false
    } else {
      /**
       * Ignore duplicate focus event when returning from native app on
       * iOS Safari 13.3+
       */
      if (!hasFocus && onFallback) {
        /**
         * wait for app switch transition to fully complete - only then is
         * 'visibilitychange' fired
         */
        setTimeout(() => {
          if (!didHide) {
            onFallback()
          }
        }, 1000)
      }
    }

    hasFocus = true
  }

  const openURL = (url: string) => {
    // On Safari, it might take a while for confirm dialog to appears
    const dialogTimeout = 1000
    setTimeout(() => {
      if (hasFocus && onIgnored) {
        onIgnored()
      }
    }, dialogTimeout)
    console.log('window.open')
    window.open(url, openInNewTab ? '_blank' : '_self')
  }

  const isAppInstalled = async (url: string) => {
    return new Promise((resolve, reject) => {
      const iframe = document.createElement('iframe')
      // iframe.style.display = 'none'
      iframe.src = url
      const removeIframe = () => {
        iframe.removeEventListener('load', checkInstalled)
        iframe.removeEventListener('error', checkNotInstalled)
        // iframe.parentNode?.removeChild(iframe)
      }
      const checkInstalled = (e:any ) => {
        console.log('e', e.type)
        resolve(true)
        removeIframe()
      }
      const checkNotInstalled = (e:any) => {
        console.log('e', e.type)
        resolve(false)
        removeIframe()
      }
      iframe.addEventListener('load', checkInstalled)
      iframe.addEventListener('error',  event => {
        console.log(`${event.type}: Loading image`);
      })
      document.body.appendChild(iframe)
      setTimeout(() => {
        resolve(false)
        removeIframe()
      }, 1000)
    })
  }

  useEffect(() => {
    window.addEventListener('blur', onBlur)
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('focus', onFocus)

    return () => {
      window.removeEventListener('blur', onBlur)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('focus', onFocus)
    }
  }, [])

  return {
    openURL,
    // isAppInstalled,
    isAppInstalled
  }
}

export default useDeepLink
