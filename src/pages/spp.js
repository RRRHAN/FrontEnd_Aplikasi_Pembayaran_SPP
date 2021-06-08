import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"
import price from "../component/Price"

export class spp extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			action: "",
			spps: [],
			id_spp: "",
			nominal: "",
			tahun: "",
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
	getspps = () => {
		let url = base_url + "/spp"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ spps: response.data })
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
	Add = () => {
		$("#modal_spp").modal("show")
		this.setState({
			action: "insert",
			id_spp: "",
			nominal: "",
			tahun: "",
		})
	}
	Edit = (selectedItem) => {
		$("#modal_spp").modal("show")
		this.setState({
			action: "update",
			id_spp: selectedItem.id_spp,
			nominal: selectedItem.nominal,
			tahun: selectedItem.tahun,
		})
	}
	savespp = (event) => {
		event.preventDefault()
		$("#modal_spp").modal("hide")
		let form = {
			id_spp: this.state.id_spp,
			nominal: this.state.nominal,
			tahun: this.state.tahun,
		}

		let url = base_url + "/spp"
		if (this.state.action === "insert") {
			axios
				.post(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getspps()
				})
				.catch((error) => console.log(error))
		} else if (this.state.action === "update") {
			axios
				.put(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getspps()
				})
				.catch((error) => console.log(error))
		}
	}
	dropspp = (selectedItem) => {
		if (window.confirm("are you sure will delete this item?")) {
			let url = base_url + "/spp/" + selectedItem.id_spp
			axios
				.delete(url, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getspps()
				})
				.catch((error) => console.log(error))
		}
	}

	componentDidMount() {
		this.getspps()
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<h3 className='text-bold text-info mt-2'>spp List</h3>
					<table className='table table-bordered'>
						<thead>
							<tr>
								<th>#</th>
								<th>Nominal</th>
								<th>Tahun</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{this.state.spps.map((item, index) => (
								<tr key={index}>
									<td>{item.id_spp}</td>
									<td>{price(item.nominal)}</td>
									<td>{item.tahun}</td>
									<td>
										<button
											className='btn btn-sm btn-info m-1'
											onClick={() => this.Edit(item)}
										>
											Edit
										</button>

										<button
											className='btn btn-sm btn-danger m-1'
											onClick={() => this.dropspp(item)}
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button className='btn btn-success' onClick={() => this.Add()}>
						Add spp
					</button>
					{/* modal spp  */}
					<div className='modal fade' id='modal_spp'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header bg-info text-white'>
									<h4>Form spp</h4>
								</div>
								<div className='modal-body'>
									<form onSubmit={(ev) => this.savespp(ev)}>
										nominal
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.nominal}
											onChange={(ev) =>
												this.setState({ nominal: ev.target.value })
											}
											required
										/>
										tahun
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.tahun}
											onChange={(ev) =>
												this.setState({ tahun: ev.target.value })
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
			</div>
		)
	}
}

export default spp
