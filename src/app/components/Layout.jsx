import Head from 'next/head'
function Layout({ title, description, children }) {

    return (
        <div>
            <Head>
                <title> {title ? `${title} - Test-Trial ` : 'E-commerce App'} </title>
                <meta name="description" content={description ? description : "Test Trial"} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                {children}
            </div>
        </div>
    )
}

export default Layout
