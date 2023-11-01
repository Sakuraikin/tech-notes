import { Link } from 'react-router-dom'

function Public() {
  return (
    <section className='public'>
        <header>
            <h1>Welcome to <span className='nowrap'></span>TicTechGo!</h1>
        </header>
        <main className="public__main">
            <p>Headquartered in beautiful Seattle, Washington, tucked between the Olympic and Cascade mountains,
                TicTechGo provides a one-stop shop for all your workflow management needs.
                Whether your business is a small snowboard shop or a large enterprise computer repair service,
                TicTechGo is here to help you delegate and manage employee tasks as efficiently as possible.
            </p>
            <address className='public__addr'>
                TicTechGo
                4269 Foo Street
                Seattle, WA 98101
                <a href="tel:+1206-555-4269"></a>
                <a href="https://www.tictechgo.com"></a>
            </address>
        </main>
        <footer><Link to='/login'>Login</Link></footer>
    </section>
  )
}

export default Public