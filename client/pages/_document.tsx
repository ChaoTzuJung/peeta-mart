import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const { renderPage } = ctx;
        const sheet = new ServerStyleSheet();
        const styleTags = sheet.getStyleElement();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
        return { ...page, styleTags };
    }

    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument