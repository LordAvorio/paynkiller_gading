import React from "react";
import axios from "axios";
import swal from 'sweetalert';
import { Grid, Row, Col, Button, IconButton, Icon, Form, InputGroup, Input, Modal, Alert } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, getUserCart } from '../action'
import { Link } from "react-router-dom";
import "../css/pages/detailProduk.css";
import TopNavigation from "../components/TopNavigation";

const DetailProdukScreen = (props) => {
  const URL_IMG = "http://localhost:2000/";
  const [Data, setData] = React.useState({});
  const id_produk = props.location.search.substring(1);
  const [angka, setAngka] = React.useState(0);
  console.log(id_produk);
  console.log(angka);
  console.log(Data);

  React.useEffect(() => {
    axios
      .post(`http://localhost:2000/produk/getProduk?${id_produk}`)
      .then((res) => setData(res.data[0]));
  }, []);

  const btnBuy = () => {
    console.log(angka);
  };

  console.log(Data);
  return (
    <div>
      <TopNavigation />
      <Col md={24} style={{ paddingTop: "20px", paddingLeft: "50px" }}>
        <Link to="/">
          <IconButton
            id="back-menu-button"
            icon={<Icon icon="angle-left" id="icon-menu-button" />}
          >
            Back To Home
          </IconButton>
        </Link>
      </Col>
      <Col md={24} style={{ paddingTop: "20px", paddingLeft: "50px" }}>
        <div id="container2">
          <div id="container2_1">
            <div id="Box">
              <img
                src={
                  Data.gambar_obat
                    ? URL_IMG + Data.gambar_obat
                    : "https://dimarta.com/wp-content/uploads/2019/09/Cara-Memperbaiki-Error-404-Wordpress-Dengan-Mudah.png"
                }
                style={{ height: 313, width: 313 }}
                id="gambarProduk"
              />
            </div>
          </div>
          <div id="container2_2">
            <div id="container1">
              <h1 id="judulDetailProduk">{Data.nama_produk}</h1>
              <h1 id="hargaDetailProduk">
                Rp. {Data.harga_produk ? Data.harga_produk.toLocaleString() : 0}
              </h1>
            </div>
            <p id="minititle">Indikasi Umum</p>
            <p id="minitext">{Data.indikasi_umum}</p>
            <p id="minititle">Aturan Pakai</p>
            <p id="minitext">{Data.aturan_pakai}</p>
            <p id="minititle">Komposisi</p>
            <p id="minitext">{Data.komposisi}</p>
            <p id="minititle">Keterangan Obat</p>
            <p id="minitext">{Data.keterangan_obat}</p>
            <p id="minititle">Brand</p>
            <p id="minitext">{Data.nama_brand}</p>
            <p id="minititle">Category</p>
            <p id="minitext">{Data.nama_category}</p>
          </div>
          <div id="container2_3">
            <Grid fluid>
              <Row>
                <Col md={4}>
                  <Button
                    color="cyan"
                    onClick={() => setAngka((prev) => parseInt(prev) + 1)}
                    disabled={angka >= Data.jumlah_produk}
                    style={{width: '100%', padding: '12px 0px'}}
                  >
                    ➕
                  </Button>
                </Col>
                <Col md={16}>
                  <InputGroup style={{ height: "100%",width: '100%'}}>
                    <Input
                      value={angka}
                      onChange={(value, event) => setAngka(parseInt(value))}
                      type="number"
                      placeholder="Username"
                      style={{ color: "#04BF8A", textAlign: 'center', fontSize: '20px' }}
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Button
                    color="cyan"
                    onClick={() => setAngka((prev) => parseInt(prev) - 1)}
                    disabled={angka === 0}
                    style={{width: '100%', padding: '12px 0px'}}
                  >
                    ➖
                  </Button>
                </Col>
                <Col md={24} style={{padding: '0px 50px'}}>
                  <Button
                    color="green"
                    style={{ width: "100%", marginTop: '20px',}}
                    onClick={btnBuy}
                  >
                    Buy
                  </Button>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </Col>
    </div>
  );
};

export default DetailProdukScreen;
