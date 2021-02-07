import { AppProps } from 'next/app'
import Router from 'next/router';
import NProgress from 'nprogress';

import Page from '../components/Page';
// 也可以在 <Head></Head> 內做 <link rel="stylesheet" type="text/css" href="/nprogress.css" />
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', url => {
    console.log(`Loading: ${url}`)
    NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => (
    <Page>
        <Component {...pageProps} />
    </Page>
)

export default App

// Loading Reference: https://github.com/vercel/next.js/tree/canary/examples/with-loading