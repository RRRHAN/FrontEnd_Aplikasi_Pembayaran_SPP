import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config.js"

export class home extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			adminName: null,
			kelasCount: 0,
			petugasCount: 0,
			siswaCount: 0,
			pembayaranCount: 0,
			sppCount: 0,
		}
		if (localStorage.getItem("token")) {
			this.state.token = localStorage.getItem("token")
		} else {
			window.location = "/login"
		}
	}
	headerConfig = () => {
		let header = {
			headers: { Authorization: `Bearer ${this.state.token}` },
		}
		return header
	}
	getSiswa = () => {
		let url = base_url + "/siswa"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ siswaCount: response.data.length })
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						window.alert(error.response.data.message)
						this.props.history.push("/login")
					}
				} else {
					console.log(error)
				}
			})
	}
	getKelas = () => {
		let url = base_url + "/kelas"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ kelasCount: response.data.length })
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						window.alert(error.response.data.message)
						this.props.history.push("/login")
					}
				} else {
					console.log(error)
				}
			})
	}
	getPembayaran = () => {
		let url = base_url + "/pembayaran"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ pembayaranCount: response.data.length })
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						window.alert(error.response.data.message)
						this.props.history.push("/login")
					}
				} else {
					console.log(error)
				}
			})
	}
	getPetugas = () => {
		let url = base_url + "/petugas"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ petugasCount: response.data.length })
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						window.alert(error.response.data.message)
						this.props.history.push("/login")
					}
				} else {
					console.log(error)
				}
			})
	}
	getSPP = () => {
		let url = base_url + "/spp"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ sppCount: response.data.length })
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status) {
						window.alert(error.response.data.message)
						this.props.history.push("/login")
					}
				} else {
					console.log(error)
				}
			})
	}
	getAdminName = () => {
		let admin = JSON.parse(localStorage.getItem("admin"))
		this.setState({ adminName: admin.name })
	}
	componentDidMount() {
		this.getSiswa()
		this.getPetugas()
		this.getSPP()
		this.getKelas()
		this.getPembayaran()
		this.getAdminName()
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container mt-2'>
					<h3 className='my-2'>
						<strong>Welcome back, {this.state.adminName}</strong>
					</h3>
					<div className='row'>
						{/* kelas count */}
						<div className='col-lg-4 col-md-6 col-sm-12 mt-2'>
							<div className='card'>
								<div className='card-body bg-success'>
									<h4 className='text-dark'>
										<strong>Kelas Count</strong>
									</h4>
									<h1 className='text-white'>
										<strong>{this.state.kelasCount}</strong>
									</h1>
								</div>
							</div>
						</div>

						{/* petugas count */}
						<div className='col-lg-4 col-md-6 col-sm-12 mt-2'>
							<div className='card'>
								<div className='card-body bg-info'>
									<h4 className='text-dark'>
										<strong>petugas Count</strong>
									</h4>
									<h1 className='text-white'>
										<strong>{this.state.petugasCount}</strong>
									</h1>
								</div>
							</div>
						</div>

						{/* pembayaran count */}
						<div className='col-lg-4 col-md-6 col-sm-12 mt-2'>
							<div className='card'>
								<div className='card-body bg-warning'>
									<h4 className='text-dark'>
										<strong>pembayaran Count</strong>
									</h4>
									<h1 className='text-white'>
										<strong>{this.state.pembayaranCount}</strong>
									</h1>
								</div>
							</div>
						</div>

						{/* spp count */}
						<div className='col-lg-4 col-md-6 col-sm-12 mt-2'>
							<div className='card'>
								<div className='card-body bg-danger'>
									<h4 className='text-dark'>
										<strong>spp Count</strong>
									</h4>
									<h1 className='text-white'>
										<strong>{this.state.sppCount}</strong>
									</h1>
								</div>
							</div>
						</div>

						{/* siswa count */}
						<div className='col-lg-4 col-md-6 col-sm-12 mt-2'>
							<div className='card'>
								<div className='card-body bg-primary'>
									<h4 className='text-dark'>
										<strong>siswa Count</strong>
									</h4>
									<h1 className='text-white'>
										<strong>{this.state.siswaCount}</strong>
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default home
