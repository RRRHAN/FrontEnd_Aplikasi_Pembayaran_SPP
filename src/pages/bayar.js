import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"

export class bayar extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			nisn: "",
			bulan_dibayar: "",
			tahun_dibayar: "",
			jumlah_bayar: "",
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
	savebayar = (event) => {
		event.preventDefault()
		let form = {
			nisn: this.state.nisn,
			bulan_dibayar: this.state.bulan_dibayar,
			tahun_dibayar: this.state.tahun_dibayar,
			jumlah_bayar: this.state.jumlah_bayar,
		}
		let url = base_url + "/bayar"
		axios
			.post(url, form, this.headerConfig())
			.then((response) => {
				window.alert(response.data.message)
				window.location = "/bayar"
			})
			.catch((error) => console.log(error))
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					{/* modal bayar  */}
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header bg-info text-white'>
								<h4>Form bayar</h4>
							</div>
							<div className='modal-body'>
								<form onSubmit={(ev) => this.savebayar(ev)}>
									NISN
									<input
										type='text'
										className='form-control mb-1'
										onChange={(ev) => this.setState({ nisn: ev.target.value })}
										required
									/>
									Bulan Dibayar
									<input
										type='text'
										className='form-control mb-1'
										onChange={(ev) =>
											this.setState({ bulan_dibayar: ev.target.value })
										}
										required
									/>
									tahun Dibayar
									<input
										type='text'
										className='form-control mb-1'
										onChange={(ev) =>
											this.setState({ tahun_dibayar: ev.target.value })
										}
										required
									/>
									jumlah bayar
									<input
										type='text'
										className='form-control mb-1'
										onChange={(ev) =>
											this.setState({ jumlah_bayar: ev.target.value })
										}
										required
									/>
									<button type='submit' className='btn btn-block btn-success'>
										Simpan
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default bayar
