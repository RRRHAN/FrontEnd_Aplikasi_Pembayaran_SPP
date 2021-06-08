import React, { Component } from "react"
import { Link } from "react-router-dom"

export class Navbar extends Component {
	Logout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("admin")
		window.location = "/login"
	}
	render() {
		return (
			<div className='navbar navbar-expand-lg bg-dark navbar-dark'>
				<a className='navbar-brand'>Pembayaran SPP</a>

				{/* show and hide menu */}
				<button
					className='navbar-toggler'
					data-toggle='collapse'
					data-target='#menu'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				{/* menu */}
				<div id='menu' className='navbar-collapse collpase'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link to='/' className='nav-link'>
								Home
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/siswa' className='nav-link'>
								siswa
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/kelas' className='nav-link'>
								kelas
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/spp' className='nav-link'>
								spp
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/petugas' className='nav-link'>
								petugas
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/pembayaran' className='nav-link'>
								pembayaran
							</Link>
						</li>
						<li className='nav-item'>
							<Link to='/bayar' className='nav-link'>
								bayar
							</Link>
						</li>
						<li className='nav-item'>
							<Link className='nav-link' onClick={() => this.Logout()}>
								Logout
							</Link>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default Navbar
