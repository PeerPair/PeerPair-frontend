import React from 'react'
import { Link } from 'react-router-dom'
import './navLanding.css'
export default function NavLanding() {
  return (
    <nav className="landing">
        <div><Link to="/about">About</Link></div>
        <div><Link to="/contact">Contact Us</Link></div>
        <div><Link to="/signin">Sign in</Link></div>
    </nav>
  )
}
