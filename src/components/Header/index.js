import React from 'react'
import './style.css'
import logo from './icon.svg'

export default function Header() {
  return (
    <header>
      <h1>Smart Box</h1>
      <div className="Logo">
        <img src={logo} alt="" />
      </div>
    </header>
  )
}
