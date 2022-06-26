import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { Layout } from '../components/Layout'
import { BasePageData, readUserFromRequest } from '../server.httpUtils'

type Data = BasePageData

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
    const { params, req } = context
    const user = await readUserFromRequest(req)
    return {
        props: {
            userEmail: user && user.userEmail,
        },
    }
}

export function Page({
    userEmail,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <Layout {...{ userEmail }}>
            <div className="about">
                <p>
                    This calendar helps you keep track of when your favorites TV
                    shows are aired, season by season.
                </p>
                <p>
                    Useful if you like to wait the end of a season to watch it.
                </p>
                <p>
                    By default only a tiny subset of shows are shown. If you
                    sign in, you will be able to add/remove shows from the
                    calendar.
                </p>
                <div className="about__link-container">
                    <Link href="/">
                        <a>back to the calendar</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default Page
