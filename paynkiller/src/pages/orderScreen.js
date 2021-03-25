import React, { useState, useReducer } from "react";

import SideNav from "../components/sideNavigation";
import {
  Row,
  Col,
  Panel,
  Button,
  Modal,
  Grid,
  Header,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  InputNumber,
  Input,
  InputPicker,
} from "rsuite";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  removeError,
  getOrderDetailSpecific,
} from "../action/orderAction";

import MaterialTable from "material-table";

import swal from "sweetalert";

import "../css/pages/masterRawMaterial.css";

export default function OrderScreen() {

  const [tempIdCategory,setTempIdCategory] = useState(null)
  const [textError, setTextError] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [textOrderNumber, setTextOrderNumber] = useState("")

  const { loginError, orderData, orderDetailData } = useSelector((state) => {
    return {
      loginError: state.orderReducer.errLogin,
      orderData: state.orderReducer.dataOrder,
      orderDetailData: state.orderReducer.dataOrderDetailSpecific
    };
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    document.body.style.backgroundColor = "#f4f3f3";
    dispatch(getAllOrder());
    if (loginError) {
      setTextError(true);
    }
  }, [loginError]);

  const handleModalError = () => {
    setTextError(false);
    dispatch(removeError());
  };

  const handleOpenDetail = async (order_number,id_category) => {
      await dispatch(getOrderDetailSpecific(order_number))
      setTempIdCategory(id_category)
      setTextOrderNumber(order_number)
      setOpenModalDetail(true)
  };

  return (
    <div>
      <Grid fluid style={{ margin: "0px", padding: "0px" }}>
        <Row style={{ margin: "0px", padding: "0px" }}>
          <SideNav />
          <Col md={3}></Col>
          <Col md={21}>
            <Row style={{ padding: "60px 40px" }}>
              <Col md={24}>
                <Panel shaded style={{ padding: "20px" }}>
                  <Row>
                    <Col md={24}>
                      <p style={{ fontSize: "25px", color: "#04BF8A" }}>
                        Order Customer
                      </p>
                    </Col>
                    {/* <Col md={3}>
                                    <Button color="cyan" style={{width: "100%"}} onClick={() => setOpenModalAdd(true)}>
                                        Tambah Data
                                    </Button>
                                    </Col> */}
                  </Row>
                  <Row style={{ paddingTop: "25px" }}>
                    <Col md={24}>
                      <MaterialTable
                        columns={[
                          { title: "Order Number", field: "order_number" },
                          { title: "User", field: "username" },
                          {
                            title: "Total Bayar",
                            field: "grandTotal_checkout",
                          },
                          { title: "Via Transfer", field: "jenis_pembayaran" },
                          { title: "Keterangan", field: "keterangan" },
                          { title: "Status", field: "status" },
                        ]}
                        data={orderData}
                        actions={[
                          {
                            icon: "helpicon",
                            tooltip: "Detail Order",
                            onClick: (event, rowData) =>
                              handleOpenDetail(rowData.order_number, rowData.id_status),
                          },
                        ]}
                        title=""
                        options={{
                          actionsColumnIndex: -1,
                        }}
                      />
                    </Col>
                  </Row>
                </Panel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>

      <Modal
        backdrop="static"
        show={openModalDetail}
        onHide={() => setOpenModalDetail(true)}
        full
        style={{padding: '0px 80px'}}
      >
        <Modal.Body style={{ marginTop: "0px"}}>
          <Grid fluid>
            <Row style={{marginBottom: '30px'}}>
              <Col md={16}>
                <p style={{fontSize: '25px', fontWeight: 'bold', color: '#04BF8A'}}>Detail Order #{textOrderNumber}</p>
              </Col>
              <Col md={4}>
                <Button style={{backgroundColor: '#04BF8A', color: 'white', width: '100%'}} disabled={tempIdCategory === 3 ? false : true}>
                    Accept Order
                </Button>
              </Col>
              <Col md={4}>
                <Button style={{backgroundColor: '#e84545', color: 'white', width: '100%'}} disabled={tempIdCategory === 3 ? false : true}>
                    Reject Order
                </Button>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <MaterialTable
                  columns={[
                    { title: "Nama Barang", field: "nama_produk" },
                    { title: "Kode Racik Obat", field: "kode_custom_order" },
                    { title: "Brand", field: "nama_brand" },
                    { title: "Category", field: "nama_category" },
                    { title: "Jumlah Beli", field: "qty" },
                    { title: "Total Harga", field: "total_harga" },
                  ]}
                  data={orderDetailData}
                  actions={[
                    // {
                    //   icon: "helpicon",
                    //   tooltip: "Detail Order",
                    //   onClick: (event, rowData) =>
                    //     handleOpenDetail(rowData.order_number),
                    // },
                  ]}
                  title=""
                  options={{
                    actionsColumnIndex: -1,
                  }}
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer style={{padding: '0px 450px'}}>
          <Button
            onClick={() => setOpenModalDetail(false)}
            style={{backgroundColor: '#04BF8A', color: 'white', width: '100%', marginBottom: '15px', fontSize: '20px'}}
          >
            Exit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        backdrop="static"
        show={textError}
        onHide={() => setTextError(false)}
        size="xs"
      >
        <Modal.Body>
          <p>{loginError}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleModalError()} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
