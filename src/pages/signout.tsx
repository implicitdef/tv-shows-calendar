import { GetServerSideProps } from 'next'
import { setDestructionOfJWTCookieInResponse } from '../server.httpUtils'

type Data = {}

export const getServerSideProps: GetServerSideProps<Data> = async (context) => {
    setDestructionOfJWTCookieInResponse(context.res)
    return {
        props: {},
        redirect: {
            permanent: false,
            destination: '/',
        },
    }
}

export function Page() {
    return null
}

export default Page
