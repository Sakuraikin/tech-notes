import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'

const DashFooter = () => {
    const content = (
        <footer className="dash-footer">
            <p>Current user:</p>
            <p>Status: </p>
        </footer>
    )
    return content
}

export default DashFooter