import { Link } from 'react-router-dom'

const DashHeader = () => {
  const content = (
    <header className="dash-header">
        <div className="dash-header__container">
            <Link to='/dash/tickets'>
                <h1 className="dash-header__title">TicTechGo</h1>
            </Link>
            <nav className="dash-header__nav">
                <Link to='#'>Home</Link>
                <Link to='#'>Tickets</Link>
                <Link to='#'>About</Link>
                <Link to='#'>Contact</Link>
            </nav>
        </div>
    </header>
  )
  return content
}

export default DashHeader