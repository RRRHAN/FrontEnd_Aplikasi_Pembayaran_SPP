import React, { Component } from "react"
import Navbar from "../component/Navbar"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"
import price from "../component/Price"

export class pembayaran extends Component {
	constructor() {
		super()
		this.state = {
			token: "",
			action: "",
			pembayarans: [],
			id_pembayaran: "",
			id_petugas: "",
			nisn: "",
			tgl_bayar: "",
			bulan_dibayar: "",
			tahun_dibayar: "",
			id_spp: "",
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
	getpembayarans = () => {
		let url = base_url + "/pembayaran"
		axios
			.get(url, this.headerConfig())
			.then((response) => {
				this.setState({ pembayarans: response.data })
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
		$("#modal_pembayaran").modal("show")
		this.setState({
			action: "insert",
			id_pembayaran: "",
			id_petugas: "",
			nisn: "",
			tgl_bayar: "",
			bulan_dibayar: "",
			tahun_dibayar: "",
			id_spp: "",
			jumlah_bayar: "",
		})
	}
	Edit = (selectedItem) => {
		$("#modal_pembayaran").modal("show")
		this.setState({
			action: "update",
			id_pembayaran: selectedItem.id_pembayaran,
			id_petugas: selectedItem.id_petugas,
			nisn: selectedItem.nisn,
			tgl_bayar: selectedItem.tgl_bayar,
			bulan_dibayar: selectedItem.bulan_dibayar,
			tahun_dibayar: selectedItem.tahun_dibayar,
			id_spp: selectedItem.id_spp,
			jumlah_bayar: selectedItem.jumlah_bayar,
		})
	}
	savepembayaran = (event) => {
		event.preventDefault()
		$("#modal_pembayaran").modal("hide")
		let form = {
			id_pembayaran: this.state.id_pembayaran,
			id_petugas: this.state.id_petugas,
			nisn: this.state.nisn,
			tgl_bayar: this.state.tgl_bayar,
			bulan_dibayar: this.state.bulan_dibayar,
			tahun_dibayar: this.state.tahun_dibayar,
			id_spp: this.state.id_spp,
			jumlah_bayar: this.state.jumlah_bayar,
		}

		let url = base_url + "/pembayaran"
		if (this.state.action === "insert") {
			axios
				.post(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getpembayarans()
				})
				.catch((error) => console.log(error))
		} else if (this.state.action === "update") {
			axios
				.put(url, form, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getpembayarans()
				})
				.catch((error) => console.log(error))
		}
	}
	droppembayaran = (selectedItem) => {
		if (window.confirm("are you sure will delete this item?")) {
			let url = base_url + "/pembayaran/" + selectedItem.id_pembayaran
			axios
				.delete(url, this.headerConfig())
				.then((response) => {
					window.alert(response.data.message)
					this.getpembayarans()
				})
				.catch((error) => console.log(error))
		}
	}

	componentDidMount() {
		this.getpembayarans()
	}

	render() {
		return (
			<div>
				<Navbar />
				<div className='container'>
					<h3 className='text-bold text-info mt-2'>pembayaran List</h3>
					<table className='table table-bordered'>
						<thead>
							<tr>
								<th>id</th>
								<th>NISN</th>
								<th>ID Petugas</th>
								<th>Tanggal bayar</th>
								<th>bulan dibayar</th>
								<th>tahun dibayar</th>
								<th>id spp</th>
								<th>Jumlah Bayar</th>
							</tr>
						</thead>
						<tbody>
							{this.state.pembayarans.map((item, index) => (
								<tr key={index}>
									<td>{item.id_pembayaran}</td>
									<td>{item.id_petugas}</td>
									<td>{item.nisn}</td>
									<td>{item.tgl_bayar}</td>
									<td>{item.bulan_dibayar}</td>
									<td>{item.tahun_dibayar}</td>
									<td>{item.id_spp}</td>
									<td>{price(item.jumlah_bayar)}</td>
									<td>
										<button
											className='btn btn-sm btn-info m-1'
											onClick={() => this.Edit(item)}
										>
											Edit
										</button>

										<button
											className='btn btn-sm btn-danger m-1'
											onClick={() => this.droppembayaran(item)}
										>
											Hapus
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button className='btn btn-success' onClick={() => this.Add()}>
						Add pembayaran
					</button>
					{/* modal pembayaran  */}
					<div className='modal fade' id='modal_pembayaran'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header bg-info text-white'>
									<h4>Form pembayaran</h4>
								</div>
								<div className='modal-body'>
									<form onSubmit={(ev) => this.savepembayaran(ev)}>
										Id Petugas
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.id_petugas}
											onChange={(ev) =>
												this.setState({ id_petugas: ev.target.value })
											}
											required
										/>
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
										Tanggal Bayar
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.tgl_bayar}
											onChange={(ev) =>
												this.setState({ tgl_bayar: ev.target.value })
											}
											required
										/>
										Bulan DiBayar
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.bulan_dibayar}
											onChange={(ev) =>
												this.setState({ bulan_dibayar: ev.target.value })
											}
											required
										/>
										Tahun DiBayar
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.tahun_dibayar}
											onChange={(ev) =>
												this.setState({ tahun_dibayar: ev.target.value })
											}
											required
										/>
										ID SPP
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.id_spp}
											onChange={(ev) =>
												this.setState({ id_spp: ev.target.value })
											}
											required
										/>
										Jumlah Bayar
										<input
											type='text'
											className='form-control mb-1'
											value={this.state.jumlah_bayar}
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
			</div>
		)
	}
}

export default pembayaran
