import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div class="container">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p class="col-md-4 mb-0 text-muted">© 2023 Company, Inc</p>

        <Link to="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <img class="bi me-2" width="40" height="32" src='https://media.istockphoto.com/id/1223595936/vector/vector-leaf-letter-design-f.jpg?s=612x612&w=0&k=20&c=NWKUCzvZrQWbslsW0KGeRQBPLw63WJivF580xPoYDxE=' ></img>
        </Link>

        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
          <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
        </ul>
      </footer>
    </div>
  )
}
