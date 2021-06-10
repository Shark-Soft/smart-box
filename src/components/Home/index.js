import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <main>
      <h1>Bienvenido a SMART BOX</h1>
      <p>Seleccione su usuario</p>
      <div className="home-menu ">
        <Link className="btn" to="category/owner">
          Dueno
        </Link>
        <Link className="btn" to="category/watcher/">
          Vigilante
        </Link>
      </div>
    </main>
  )
}

export default Home
