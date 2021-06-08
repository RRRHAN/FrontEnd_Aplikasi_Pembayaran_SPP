import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export class kelas extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			action: "",
			kelass: [],
			id_kelas: "",
			nama_kelas: "",
			kompetensi_keahlian: "",
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
	getkelass = () => {
		let url = base_url + "/kelas"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ kelass: response.data })
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
		$("#modal_kelas").modal("show")
		this.setState({
			action: "insert",
			id_kelas: "",
			nama_kelas: "",
			kompetensi_keahlian: "",
		})
	}
	Edit = (selectedItem) => {
		$("#modal_kelas").modal("show")
		this.setState({
			action: "update",
			id_kelas: selectedItem.id_kelas,
			nama_kelas: selectedItem.nama_kelas,
			kompetensi_keahlian: selectedItem.kompetensi_keahlian,
		})
	}
	savekelas = (event) => {
		event.preventDefault()
		$("#modal_kelas").modal("hide")
		let form = {
			id_kelas: this.state.id_kelas,
			nama_kelas: this.state.nama_kelas,
			kompetensi_keahlian: this.state.kompetensi_keahlian,
		}
		let url = base_url + "/kelas"
		if (this.state.action === "insert") {
			axios
				.post(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getkelass()
				})
				.catch((error) => console.log(error))
		} else if (this.state.action === "update") {
			axios
				.put(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getkelass()
				})
				.catch((error) => console.log(error))
		}
	}
	dropkelas = (selectedItem) => {
		if (window.confirm("are you sure will delete this item?")) {
			let url = base_url + "/kelas/" + selectedItem.id_kelas
			axios
				.delete(url, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getkelass()
				})
				.catch((error) => console.log(error))
		}
	}

	componentDidMount() {
		this.getkelass()
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<h3 className='text-bold text-info mt-2'>kelas List</h3>
					<table className='table table-bordered'>
						<thead>
							<tr>
								<th>#</th>
								<th>Nama kelas</th>
								<th>jurusan</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{this.state.kelass.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.nama_kelas}</td>
									<td>{item.kompetensi_keahlian}</td>
									<td>
										<button
											className='btn btn-sm btn-info m-1'
											onClick={() => this.Edit(item)}
										>
											Edit
										</button>

										<button
											className='btn btn-sm btn-danger m-1'
											onClick={() => this.dropkelas(item)}
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button className='btn btn-success' onClick={() => this.Add()}>
						Add kelas
					</button>
					{/* modal kelas  */}
					<div className='modal fade' id='modal_kelas'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header bg-info text-white'>
									<h4>Form kelas</h4>
								</div>
								<div className='modal-body'>
									<form onSubmit={(ev) => this.savekelas(ev)}>
										Nama kelas
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.nama_kelas}
											onChange={(ev) =>
												this.setState({ nama_kelas: ev.target.value })
											}
											required
										/>
										Kompetensi Keahlian
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.kompetensi_keahlian}
											onChange={(ev) =>
												this.setState({ kompetensi_keahlian: ev.target.value })
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

export default kelas
