import Link from 'next/link'
import { Layout } from '../components/Layout'

// TODO add a way to go back to HP
export function Page() {
    return (
        <Layout>
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
