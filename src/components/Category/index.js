import React from 'react'
import { Link, useParams } from 'react-router-dom'
export default function Category() {
  const { cat } = useParams()
  return (
    <main>
      <Link className="btn" to="/">
        Inicio
      </Link>
      <h1>Usuario {cat}</h1>
      <div className="home-menu">
        <Link className="btn" to={`/${cat}/box/1`}>
          Caja 1
        </Link>
        <Link className="btn" to={`/${cat}/box/2`}>
          Caja 2
        </Link>
        <Link className="btn" to={`/${cat}/box/3`}>
          Caja 3
        </Link>
      </div>
    </main>
  )
}
