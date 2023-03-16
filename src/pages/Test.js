import {useEffect, useState}  from 'react'
import useDeepLink from './useDeepLink'

const url = 'intent://app.binance.com/p2p/pass?orderNo=3f082c5e26b931acae48903fea3a4a29#Intent;scheme=bnc;package=com.binance.dev;end'
// const url = 'https://google.com'

const Test = () => {
    const  {openURL, isAppInstalled}  = useDeepLink({onIgnored: () => console.log('onIgnored'), onFallback: () => console.log('onFallback') , onReturn: () => console.log('onReturn')})
    const [installed, setInstalled] = useState(true)
    const handleOpen =  () => {
       
       openURL(url)
    }

    const checkInstalled = async () => {
        const _installed = await isAppInstalled(url)
        setInstalled(_installed)
    }

    useEffect(() => {
        checkInstalled()
    })
    return (<div>
        {installed ? 'installed' : 'not installed'}
        <button onClick={handleOpen}>Open</button>
        </div>)
}
export default Test