import { callSignin } from '../client.api'
import { Layout } from '../components/Layout'
import { EmailForm } from '../components/meta/EmailForm'

export function Page() {
    return (
        <Layout>
            <EmailForm onSubmit={callSignin} type="signin" />
        </Layout>
    )
}

export default Page
