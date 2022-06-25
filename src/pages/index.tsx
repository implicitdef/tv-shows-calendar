import moment from 'moment'
import * as yearPage from './[year]'

type Data = { message: string }

export const getServerSideProps: typeof yearPage.getServerSideProps = (ctx) => {
    return yearPage.getServerSideProps({
        ...ctx,
        params: {
            ...ctx.params,
            year: moment().year().toString(),
        },
    })
}

const Page = yearPage.Page

export default Page
