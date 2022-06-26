import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { callSignin } from '../client.api'
import { Layout } from '../components/Layout'
import { EmailForm } from '../components/meta/EmailForm'
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
            <EmailForm onSubmit={callSignin} type="signin" />
        </Layout>
    )
}

export default Page
