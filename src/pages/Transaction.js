import React, { Component } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Space, Table, Divider, Modal } from "antd";
import {
  // PlusSquareFilled,
  DeleteFilled,
  // EditFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import CardHeader from "../components/CardHeader";

const { confirm } = Modal;
const { REACT_APP_API_HOST } = process.env;

class Transaction extends Component {
  state = {
    transactions: [],
    column: [
      {
        title: "Nota",
        dataIndex: "id_nota",
        key: "id_nota",
        width: 100,
      },
      {
        title: "Kode Pelanggan",
        dataIndex: "kode_pelanggan",
        key: "kode_pelanggan",
        width: 200,
      },
      {
        title: "Subtotal",
        dataIndex: "subtotal",
        key: "subtotal",
        width: 120,
      },
      {
        title: "Tanggal",
        dataIndex: "tgl",
        key: "tgl",
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Space>
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

  deleteItem = (item) => {
    const reload = this.getTransactions;
    confirm({
      centered: true,
      title: "Delete transaction !",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure gonna delete this transaction ?",
      onOk() {
        return axios
          .delete(`${REACT_APP_API_HOST}/transaction/${item.id_nota}`)
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

  getTransactions = () => {
    axios
      .get(`${REACT_APP_API_HOST}/transaction`)
      .then(({ data }) => {
        if (data.success) {
          this.setState({
            transactions: data.data,
          });
        } else {
          console.log(data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.getTransactions();
  }

  render() {
    // const { type } = this.state;

    return (
      <Card className="style__card">
        <CardHeader title="Transaction" desc="Manage customer transaction" />
        <Divider orientation="left" plain>
          Manage transaction
        </Divider>
        <Row>
          <Col>
            <Table
              scroll={{ x: 700 }}
              dataSource={this.state.transactions}
              columns={this.state.column}
              rowKey={(record) => record.id_nota}
              footer={() => (
                <p style={{ fontSize: "16px", textAlign: "right" }}>
                  You have: <b>{this.state.transactions.length}</b> transaction
                </p>
              )}
              pagination={false}
            />
          </Col>
        </Row>
        {/* <Modal
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
        </Modal> */}
      </Card>
    );
  }
}

export default Transaction;
