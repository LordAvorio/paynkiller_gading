import React from 'react'
import axios from 'axios'
import Navbar from "../components/TopNavigation"
import { useSelector, useDispatch } from 'react-redux'
import { Table, Modal, Button } from 'rsuite'
const { Column, HeaderCell, Cell } = Table

const UserHistoryScreen = () => {
    // const dispatch = useDispatch()
    const [Data, setData] = React.useState([])
    const [Data2, setData2] = React.useState([])
    const [show, setShow] = React.useState(false)
    const [orderNumber, setOrderNumber] = React.useState(null)

    const { id_customer } = useSelector((state) => {
        return {
            id_customer: state.userReducer.id_customer
        }
    })
    React.useEffect(() => {
        if (id_customer) {
            axios.get(`http://localhost:2000/history/userHistory/${id_customer}`)
                .then((res) => setData(res.data))
                .catch((err) => console.log(err))
        }
    }, [id_customer])
    React.useEffect(() => {
        if (orderNumber) {
            axios.get(`http://localhost:2000/history/getDetailHistory/${orderNumber}`)
                .then((res) => setData2(res.data))
                .catch((err) => console.log(err))
        }
    }, [orderNumber])

    console.log(Data)

    const showDetail = (data) => {
        console.log(data)
        setOrderNumber(data)
        setShow(true)
    }
    return (
        <div style={{ height: '100vh', backgroundColor: '#b2bec3' }}>
            <Navbar />
            <div style={{ width: '100%', padding: 30 }}>
                <Table
                    height={600}
                    data={Data}
                    onRowClick={(data) => showDetail(data.order_number)}
                    rowHeight={70}
                    headerHeight={50}
                >
                    <Column width={150} align="center" fixed>
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Order Number</HeaderCell>
                        <Cell dataKey="order_number" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={200} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Total Price</HeaderCell>
                        <Cell>
                            {(rowData) => {
                                return (
                                    <p style={{ fontSize: 16 }}>Rp. {rowData.grandTotal_checkout.toLocaleString()}</p>
                                )
                            }}
                        </Cell>
                    </Column>

                    <Column width={150} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Payment</HeaderCell>
                        <Cell dataKey="jenis_pembayaran" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={350} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Annotation</HeaderCell>
                        <Cell dataKey="keterangan" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={155} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Transaction Date</HeaderCell>
                        <Cell dataKey="tanggal_transaksi" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={150} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Pay Date</HeaderCell>
                        <Cell dataKey="tanggal_bayar" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={100} align="center" >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Status</HeaderCell>
                        <Cell dataKey="status" style={{ fontSize: 16 }} />
                    </Column>

                    <Column width={180} align="center" fixed='right' >
                        <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Action</HeaderCell>
                        <Cell>
                            {rowData => {
                                const handleAction = () => {
                                    alert(`id:${rowData.order_number}`);
                                }
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button onClick={handleAction}> Upload </Button>
                                        <Button onClick={handleAction}> Cancel </Button>
                                    </div>

                                );
                            }}
                        </Cell>
                    </Column>
                </Table>
            </div>
            <Modal backdrop={true} show={show} onHide={() => setShow(false)} full={true}>
                <Modal.Header>
                    <Modal.Title>Custom Order Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table
                        height={490}
                        data={Data2}
                        headerHeight={50}
                    >
                        <Column width={250} align="center" fixed>
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Nama Barang</HeaderCell>
                            <Cell dataKey="nama_produk" style={{ fontSize: 16 }} />
                        </Column>

                        <Column width={250} align="center" >
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Kode Racik Obat</HeaderCell>
                            <Cell dataKey='kode_custom_order' style={{ fontSize: 16 }} />
                        </Column>

                        <Column width={140} align="center">
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Brand</HeaderCell>
                            <Cell dataKey="nama_brand" style={{ fontSize: 16 }} />
                        </Column>

                        <Column width={200} align="center">
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Category</HeaderCell>
                            <Cell dataKey='nama_category' />
                        </Column>
                        <Column width={180} align="center">
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Jumlah Beli</HeaderCell>
                            <Cell dataKey="qty" style={{ fontSize: 16 }} />
                        </Column>
                        <Column width={200}>
                            <HeaderCell style={{ fontSize: 18, fontWeight: 'bold' }}>Total Harga</HeaderCell>
                            <Cell>
                                {(rowData) => {
                                    return (
                                        <p style={{ fontSize: 16 }}>Rp. {rowData.total_harga.toLocaleString()}</p>
                                    )
                                }}
                            </Cell>
                        </Column>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShow(false)} style={{ backgroundColor: '#04BF8A', color: 'white', fontWeight: 'bold', width: 100 }}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UserHistoryScreen