import {useEffect, useState}  from 'react'
import useDeepLink from './useDeepLink'


// const url = 'https://google.com'

const Test = () => {
    const  {openURL}  = useDeepLink({onIgnored: () => console.log('onIgnored'), onFallback: () => console.log('onFallback') , onReturn: () => console.log('onReturn')})
    const [device, setDevice] = useState('')
    const handleOpen =  (nofallback =false) => {
        console.log('nofallback', nofallback)
        const fallbackUrl = 'http://a-never-ends.web.app/'
       let url = 'bnc://app.binance.com/p2p/pass?orderNo=3f082c5e26b931acae48903fea3a4a29'
        if(device === 'Android') url =`intent://app.binance.com/p2p/pass?orderNo=3f082c5e26b931acae48903fea3a4a29#Intent;scheme=bnc${nofallback ? ';' : `;S.browser_fallback_url=${fallbackUrl};`}package=com.binance.dev;end`
       console.log(url)
        openURL(url)
    }
    /**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

useEffect(() => {
    const device = getMobileOperatingSystem()
    setDevice(device)
},[])


    return (<div>
        {device}<br/><br/>
        <button onClick={() => handleOpen(false)}>Open</button> (Stay in page if not installed) <br/><br/>
        {device === 'Android' && <><button onClick={() => handleOpen(true)}>Open</button>(Go to playstore if not installed)</>} 
        </div>)
}
export default Test