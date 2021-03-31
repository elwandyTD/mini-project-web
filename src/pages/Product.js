import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Col,
  Button,
  Space,
  Table,
  Divider,
  Input,
  Modal,
} from "antd";
import {
  PlusSquareFilled,
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import CardHeader from "../components/CardHeader";

const { confirm } = Modal;
const { REACT_APP_API_HOST } = process.env;

class Product extends Component {
  state = {
    products: [],
    column: [
      {
        title: "Kode",
        dataIndex: "kode",
        key: "kode",
        width: 100,
      },
      {
        title: "Name",
        dataIndex: "nama",
        key: "nama",
        width: 200,
      },
      {
        title: "Category",
        dataIndex: "title",
        key: "title",
        width: 120,
      },
      {
        title: "Price",
        dataIndex: "harga",
        key: "harga",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Space>
            <Button
              disabled
              onClick={() => this.showModalEdit(record)}
              type="primary"
              icon={<EditFilled />}
            />
            <Button
              type="danger"
              onClick={() => this.deleteItem(record)}
              icon={<DeleteFilled />}
            />
          </Space>
        ),
      },
    ],
  };

  getProducts = () => {
    axios
      .get(`${REACT_APP_API_HOST}/item`)
      .then(({ data }) => {
        if (data.success) {
          this.setState({
            products: data.data,
          });
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteItem = (item) => {
    const reload = this.getProducts;
    confirm({
      centered: true,
      title: "Delete product !",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure gonna delete this product ?",
      onOk() {
        return axios
          .delete(`${REACT_APP_API_HOST}/item/${item.kode}`)
          .then(({ data }) => {
            if (data.success) {
              reload();
            } else {
              console.log(data);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  onChangeValueNew = (e, name) => {
    this.setState({});
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const { product, type } = this.state;

    return (
      <Card className="style__card">
        <CardHeader title="Product" desc="Manage products that you have" />
        <Divider orientation="left" plain>
          Manage products
        </Divider>
        <Button
          onClick={this.showModalInsert}
          style={{ marginBottom: "15px" }}
          type="primary"
          icon={<PlusSquareFilled />}
        >
          Add new product
        </Button>
        <Row>
          <Col>
            <Table
              scroll={{ x: 700 }}
              dataSource={this.state.products}
              columns={this.state.column}
              rowKey={(record) => record.kode}
              footer={() => (
                <p style={{ fontSize: "16px", textAlign: "right" }}>
                  You have: <b>{this.state.products.length}</b> product
                </p>
              )}
              pagination={false}
            />
          </Col>
        </Row>
        <Modal
          title={type === "edit" ? "Update product" : "Add new product"}
          visible={this.state.visibleModal}
          footer={null}
          onCancel={this.cancelModalEdit}
        >
          <span>Title product</span>
          <Input
            placeholder="Title"
            value={
              type === "edit"
                ? product && product.title && product.title
                : this.state.title
            }
            onChangeCapture={(value) =>
              type === "edit"
                ? this.onChangeValue(value)
                : this.onChangeTitle(value)
            }
            required={true}
          />
          <Button
            style={{ marginTop: "15px", textAlign: "right" }}
            type="primary"
            loading={this.state.loading}
            onClick={this.okModal}
          >
            Save
          </Button>
        </Modal>
      </Card>
    );
  }
}

export default Product;
