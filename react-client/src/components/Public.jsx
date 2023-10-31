import React from 'react'
import { Link } from 'react-router-dom'

function Public() {
  return (
    <section className='public'>
        <header>
            <h1>Welcome to <span className='nowrap'></span>TicTechGo!</h1>
        </header>
        <main className="public__addr">
            <p>Headquartered in beautiful Seattle, Washington, tucked between the Olympic and Cascade mountains,
                TicTechGo provides a one-stop shop for all your workflow management needs.
                Whether your business is a small snowboard shop or a large enterprise computer repair service,
                TicTechGo is here to help you manage employee workflow as efficiently as possible.
            </p>
        </main>
    </section>
  )
}

export default Public