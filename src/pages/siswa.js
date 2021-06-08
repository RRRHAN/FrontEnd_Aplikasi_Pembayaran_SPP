import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"

export class siswa extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			action: "",
			siswa: [],
			nisn: "",
			nis: "",
			nama: "",
			alamat: "",
			no_telp: "",
			id_spp: "",
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
	getsiswa = () => {
		let url = base_url + "/siswa"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ siswa: response.data })
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
		$("#modal_siswa").modal("show")
		this.setState({
			action: "insert",
			nisn: "",
			nis: "",
			nama: "",
			alamat: "",
			no_telp: "",
			id_spp: "",
		})
	}
	Edit = (selectedItem) => {
		$("#modal_siswa").modal("show")
		this.setState({
			action: "update",
			nisn: selectedItem.nisn,
			nis: selectedItem.nis,
			nama: selectedItem.nama,
			id_kelas: selectedItem.id_kelas,
			alamat: selectedItem.alamat,
			no_telp: selectedItem.no_telp,
			id_spp: selectedItem.id_spp,
		})
	}
	savesiswa = (event) => {
		event.preventDefault()
		$("#modal_siswa").modal("hide")
		let form = {
			nisn: this.state.nisn,
			nis: this.state.nis,
			nama: this.state.nama,
			id_kelas: this.state.id_kelas,
			alamat: this.state.alamat,
			no_telp: this.state.no_telp,
			id_spp: this.state.id_spp,
		}

		let url = base_url + "/siswa"
		if (this.state.action === "insert") {
			axios
				.post(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getsiswas()
				})
				.catch((error) => console.log(error))
		} else if (this.state.action === "update") {
			axios
				.put(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getsiswas()
				})
				.catch((error) => console.log(error))
		}
	}
	dropsiswa = (selectedItem) => {
		if (window.confirm("are you sure will delete this item?")) {
			let url = base_url + "/siswa/" + selectedItem.nisn
			axios
				.delete(url, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getsiswas()
				})
				.catch((error) => console.log(error))
		}
	}

	componentDidMount() {
		this.getsiswa()
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<h3 className='text-bold text-info mt-2'>siswa List</h3>
					<table className='table table-bordered'>
						<thead>
							<tr>
								<th>#</th>
								<th>NISN</th>
								<th>Nama</th>
								<th>Id Kelas</th>
								<th>Alamat</th>
								<th>No Telpon</th>
								<th>Id SPP</th>
								<th>Option</th>
							</tr>
						</thead>
						<tbody>
							{this.state.siswa.map((item, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.nisn}</td>
									<td>{item.nama}</td>
									<td>{item.id_kelas}</td>
									<td>{item.alamat}</td>
									<td>{item.no_telp}</td>
									<td>{item.id_spp}</td>
									<td>
										<button
											className='btn btn-sm btn-info m-1'
											onClick={() => this.Edit(item)}
										>
											Edit
										</button>

										<button
											className='btn btn-sm btn-danger m-1'
											onClick={() => this.dropsiswa(item)}
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button className='btn btn-success' onClick={() => this.Add()}>
						Add siswa
					</button>
					{/* modal siswa  */}
					<div className='modal fade' id='modal_siswa'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header bg-info text-white'>
									<h4>Form siswa</h4>
								</div>
								<div className='modal-body'>
									<form onSubmit={(ev) => this.savesiswa(ev)}>
										NISN
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.nisn}
											onChange={(ev) =>
												this.setState({ nisn: ev.target.value })
											}
											required
										/>
										nis
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.nis}
											onChange={(ev) => this.setState({ nis: ev.target.value })}
											required
										/>
										nama
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.nama}
											onChange={(ev) =>
												this.setState({ nama: ev.target.value })
											}
											required
										/>
										Id kelas
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.id_kelas}
											onChange={(ev) =>
												this.setState({ id_kelas: ev.target.value })
											}
											required
										/>
										alamat
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.alamat}
											onChange={(ev) =>
												this.setState({ alamat: ev.target.value })
											}
											required
										/>
										No telp
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.no_telp}
											onChange={(ev) =>
												this.setState({ no_telp: ev.target.value })
											}
											required
										/>
										Id spp
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.id_spp}
											onChange={(ev) =>
												this.setState({ id_spp: ev.target.value })
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

export default siswa
