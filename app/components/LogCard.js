import React, { useMemo } from 'react'
import moment from 'moment'

import Row from 'app/components/Row'

const LogCard = ({ date, format = 'DD-MM-YYYY HH:mm', ...props }) => {
  const momentDate = useMemo(() => moment(date, format), [date, format])
  const weekday = useMemo(() => {
    const isoWeekday = momentDate.isoWeekday()

    switch (isoWeekday) {
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      case 7:
        return 'Sunday'
      // Should never happen
      default:
        return ''
    }
  }, [momentDate])

  return (
    <Row
      highlight={momentDate.format('HH:mm')}
      primaryText={weekday}
      secondaryText={momentDate.format('Do MMMM YYYY')}
      separator
      {...props}
    />
  )
}

export default LogCard
