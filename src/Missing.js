import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main>
      <h2>Missing</h2>
      <p>Well, that's disappointing.</p>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
    </main>
  )
}

export default Missing