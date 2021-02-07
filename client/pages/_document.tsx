import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(() => App => props => sheet.collectStyles(<App {...props} />))
        const styleTags = sheet.getStyleElement(); // or sheet.getStyleTags();
        return { ...page, styleTags };
    }

    // static async getInitialProps(ctx: DocumentContext) {
    //     const sheet = new ServerStyleSheet();
    //     const originalRenderPage = ctx.renderPage;
    //     const styleTags = sheet.getStyleElement();
    
    //     try {
    //         ctx.renderPage = () => originalRenderPage({
    //             enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
    //         })

    //         const initialProps = await Document.getInitialProps(ctx);

    //         return {
    //             ...initialProps,
    //             styles: (
    //                 <>
    //                     {initialProps.styles}
    //                     {sheet.getStyleElement()}
    //                 </>
    //             ),
    // Styles fragment is rendered after the app and page rendering finish.
    // styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    //         }
    //     }
    //     catch (error) {
    //         console.error(error)
    //     }
    //     finally {
    //         sheet.seal()
    //     }
    // }

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

//注：在Next.js 設定 Theme 的部分也是在目錄 pages 底下創建一個 _document.js 檔案 因為 SSR 的部分有些程式碼是不能寫在 React dom 節點,這邊 getInitialProps SC 提供了一個 ServerStyleSheet renderPage 就是在 APP 渲染之前加上一個 sheet.collectStyles 的 Wrap ，然後也在 Head 底下把 sheet.getStyleElement() 產出的 Style 打上去這樣就會有 SSR 的效果了
// https://stackoverflow.com/questions/62684488/why-is-server-side-rendered-styled-components-with-nextjs-breaking-my-applicatio