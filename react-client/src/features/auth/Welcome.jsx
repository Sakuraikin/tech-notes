import { Link } from 'react-router-dom'

const Welcome = () => {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US',
  { dateStyle: 'full',
  timeStyle: 'long' })
    .format(date)
  const content = (

  )

  return content
}

export default Welcome