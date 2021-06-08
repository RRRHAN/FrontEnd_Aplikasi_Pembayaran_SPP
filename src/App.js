import React from "react"
import { Switch, Route } from "react-router-dom"
import Login from "./pages/login"
import siswa from "./pages/siswa"
import petugas from "./pages/petugas"
import kelas from "./pages/kelas"
import Home from "./pages/home"
import spp from "./pages/spp"
import bayar from "./pages/bayar"
import pembayaran from "./pages/pembayaran"

function App() {
	return (
		<Switch>
			<Route exact path='/' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/siswa' component={siswa} />
			<Route path='/petugas' component={petugas} />
			<Route path='/kelas' component={kelas} />
			<Route path='/spp' component={spp} />
			<Route path='/bayar' component={bayar} />
			<Route path='/pembayaran' component={pembayaran} />
		</Switch>
	)
}

export default App
