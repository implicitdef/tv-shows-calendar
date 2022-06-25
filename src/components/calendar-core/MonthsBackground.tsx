import * as React from 'react'
import { range0_11 } from '../../dateUtils'
import { getStyleForMonthInYear } from '../utils/styleUtils'

// Columns suggesting the months behind the series
const MonthsBackground: React.FC<{
    year: number
}> = ({ year }) => (
    <div className="calendar-core__months-background">
        {range0_11.map((monthNumber) => {
            return (
                <div
                    style={getStyleForMonthInYear({ year, monthNumber })}
                    key={monthNumber}
                    className="calendar-core__month-column"
                />
            )
        })}
    </div>
)
export default MonthsBackground
