import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export class petugas extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			action: "",
			petugass: [],
			id_petugas: "",
			username: "",
			password: "",
			nama_petugas: "",
			level: "",
			fillPassword: false,
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
	getpetugass = () => {
		let url = base_url + "/petugas"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ petugass: response.data })
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
		$("#modal_petugas").modal("show")
		this.setState({
			action: "insert",
			id_petugas: "",
			username: "",
			password: "",
			nama_petugas: "",
			level: "",
			fillPassword: true,
		})
	}
	Edit = (selectedItem) => {
		$("#modal_petugas").modal("show")
		this.setState({
			action: "update",
			id_petugas: selectedItem.id_petugas,
			username: selectedItem.username,
			password: selectedItem.password,
			nama_petugas: selectedItem.nama_petugas,
			level: selectedItem.level,
			fillPassword: false,
		})
	}
	savepetugas = (event) => {
		event.preventDefault()
		$("#modal_petugas").modal("hide")
		let form = {
			id_petugas: this.state.id_petugas,
			username: this.state.username,
			nama_petugas: this.state.nama_petugas,
			level: this.state.level,
		}
		console.log(form.level)

		if (this.state.fillPassword) {
			form.password = this.state.password
		}

		let url = base_url + "/petugas"
		if (this.state.action === "insert") {
			axios
				.post(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getpetugass()
				})
				.catch((error) => console.log(error))
		} else if (this.state.action === "update") {
			axios
				.put(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getpetugass()
				})
				.catch((error) => console.log(error))
		}
	}
	droppetugas = (selectedItem) => {
		if (window.confirm("are you sure will delete this item?")) {
			let url = base_url + "/petugas/" + selectedItem.id_petugas
			axios
				.delete(url, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getpetugass()
				})
				.catch((error) => console.log(error))
		}
	}

	componentDidMount() {
		this.getpetugass()
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<h3 className='text-bold text-info mt-2'>petugas List</h3>
					<table className='table table-bordered'>
						<thead>
							<tr>
								<th>#</th>
								<th>Nama</th>
								<th>Username</th>
								<th>Level</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{this.state.petugass.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.nama_petugas}</td>
									<td>{item.username}</td>
									<td>{item.level}</td>
									<td>
										<button
											className='btn btn-sm btn-info m-1'
											onClick={() => this.Edit(item)}
										>
											Edit
										</button>

										<button
											className='btn btn-sm btn-danger m-1'
											onClick={() => this.droppetugas(item)}
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button className='btn btn-success' onClick={() => this.Add()}>
						Add petugas
					</button>
					{/* modal petugas  */}
					<div className='modal fade' id='modal_petugas'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header bg-info text-white'>
									<h4>Form petugas</h4>
								</div>
								<div className='modal-body'>
									<form onSubmit={(ev) => this.savepetugas(ev)}>
										Username
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.username}
											onChange={(ev) =>
												this.setState({ username: ev.target.value })
											}
											required
										/>
										Nama Petugas
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.nama_petugas}
											onChange={(ev) =>
												this.setState({ nama_petugas: ev.target.value })
											}
											required
										/>
										Level
										<select
											class='custom-select'
											value={this.state.level}
											onChange={(ev) => {
												this.setState({ level: ev.target.value })
												console.log(this.state.level)
											}}
										>
											<option selected>Pilih Level</option>
											<option value='admin'>Admin</option>
											<option value='petugas'>petugas</option>
										</select>
										{this.state.action === "update" &&
										this.state.fillPassword === false ? (
											<button
												className='btn btn-sm btn-secondary mb-1 btn-block'
												onClick={() => this.setState({ fillPassword: true })}
											>
												Change Password
											</button>
										) : (
											<div>
												Password
												<input
													type='password'
													className='form-control mb-1'
													onChange={(ev) =>
														this.setState({ password: ev.target.value })
													}
													required
												/>
											</div>
										)}
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

export default petugas
