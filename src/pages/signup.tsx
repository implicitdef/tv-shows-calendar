import { callSignup } from '../client.api'
import { Layout } from '../components/Layout'
import { EmailForm } from '../components/meta/EmailForm'

export function Page() {
    return (
        <Layout>
            <EmailForm onSubmit={callSignup} type="signup" />
        </Layout>
    )
}

export default Page
