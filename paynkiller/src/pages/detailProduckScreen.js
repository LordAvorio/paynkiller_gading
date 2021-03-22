import React from 'react'
import axios from 'axios'
import { Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input, Modal } from 'rsuite'
import { Link } from 'react-router-dom'
import '../css/pages/detailProduk.css'
import TopNavigation from '../components/TopNavigation'
const DetailProdukScreen = (props) => {
    const URL_IMG = 'http://localhost:2000/'

    const [Data, setData] = React.useState({})
    const id_produk = props.location.search.substring(1)
    const [angka, setAngka] = React.useState(0)
    console.log(id_produk)
    console.log(angka)
    console.log(Data)

    React.useEffect(() => {
        axios.post(`http://localhost:2000/produk/getProduk?${id_produk}`)
            .then((res) => setData(res.data[0]))
    }, [])
    console.log(Data)
    return (
        <div id='bigContainer'>
            <TopNavigation />            
            <Col md={24} style={{ paddingTop: "20px", paddingLeft: "25px" }}>
                <Link to='/'>
                    <IconButton id="back-menu-button" icon={<Icon icon="angle-left" id="icon-menu-button" />}>Back To Home</IconButton>
                </Link>
            </Col>
            <Col md={24} style={{ paddingTop: "20px", paddingLeft: "25px" }}>
                <div id='container1'>
                    <h1 id='judulDetailProduk'>{Data.nama_produk}</h1>
                    <h1 id='hargaDetailProduk'>Rp. {Data.harga_produk}</h1>
                </div>
                <div id='container2'>
                    <div id='container2_1'>
                        <div id='Box'>
                            <img src={Data.gambar_obat ? URL_IMG + Data.gambar_obat : 'https://dimarta.com/wp-content/uploads/2019/09/Cara-Memperbaiki-Error-404-Wordpress-Dengan-Mudah.png'} style={{ height: 313, width: 313 }} id='gambarProduk' />
                        </div>
                    </div>
                    <div id='container2_2'>
                        <p id='minititle' >Indikasi Umum</p>
                        <p id='minitext'>{Data.indikasi_umum}</p>
                        <p id='minititle' >Aturan Pakai</p>
                        <p id='minitext'>{Data.aturan_pakai}</p>
                        <p id='minititle' >Komposisi</p>
                        <p id='minitext'>{Data.komposisi}</p>
                        <p id='minititle' >Keterangan Obat</p>
                        <p id='minitext'>{Data.keterangan_obat}</p>
                        <p id='minititle' >Brand</p>
                        <p id='minitext'>{Data.nama_brand}</p>
                        <p id='minititle' >Category</p>
                        <p id='minitext'>{Data.nama_category}</p>
                    </div>
                    <div id='container2_3'>
                        <InputGroup style={{ height: '45px' }}>
                            <Input value={angka} onChange={(value, event) => setAngka(value)} type="number" placeholder="Username" style={{ color: '#04BF8A' }} />
                        </InputGroup>
                        <div style={{display:'flex', justifyContent:'space-evenly'}}>
                        <Button color='cyan' onClick={() => setAngka(prev => prev + 1)}>➕</Button>
                        <Button color='cyan' onClick={() => setAngka(prev => prev - 1)}>➖</Button>
                        </div>
                        <Button color='green' style={{width:179.6}}>Buy</Button>
                    </div>
                </div>
            </Col>
        </div>
    )
}

export default DetailProdukScreen