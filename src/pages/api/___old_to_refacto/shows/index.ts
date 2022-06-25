import type { NextApiRequest, NextApiResponse } from 'next'
import { loadData } from '../../../../server.core'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<
        {
            id: number
            name: string
        }[]
    >,
) {
    const data = await loadData()
    let series = data.map((_) => _.serie)
    const { q } = req.query
    if (q && typeof q === 'string') {
        series = series.filter((_) =>
            _.name.toLowerCase().includes(q.toLowerCase()),
        )
    }
    return res.json(series)
}
