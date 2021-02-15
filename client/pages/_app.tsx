import { NextPageContext } from 'next';
import { AppProps, AppContext } from 'next/app';
import Router from 'next/router';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import NProgress from 'nprogress';
import Page from '../components/Page';
import withData from '../lib/withData';
import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

interface IApolloProps {
    apollo: ApolloClient<{}>;
}

interface StatelessPage<P = {}> extends React.SFC<P> {
    getInitialProps?: (ctx: NextPageContext) => Promise<P>
}

const App = ({ Component, pageProps, apollo }: IApolloProps & AppProps & StatelessPage) => (
    <ApolloProvider client={apollo}>
        <Page>
            <Component {...pageProps} />
        </Page>
    </ApolloProvider>
)

// https://linguinecode.com/post/next-js-typescript-getinitialprops
App.getInitialProps = async ({ Component, ctx }: AppContext) => {
    let pageProps: any = {};
    // if any page have getInitialProps methods which they will, because that's what withData is adding to them
    if (Component.getInitialProps) {
        // wait and go and fetch it 
        pageProps = await Component.getInitialProps(ctx);
    }
    // get each page query Ex: /product/:id
    pageProps.query = ctx.query;
    return { pageProps };
};

export default withData(App);