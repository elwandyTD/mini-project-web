import React, { Component } from "react";
import axios from "axios";
import {
  Card,
  Row,
  Table,
  Button,
  Col,
  Divider,
  Modal,
  Popconfirm,
  Space,
  Input,
} from "antd";
import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleFilled,
  PlusSquareFilled,
} from "@ant-design/icons";

import CardHeader from "../components/CardHeader";
const { confirm } = Modal;
const { REACT_APP_API_HOST } = process.env;

class Category extends Component {
  state = {
    title: "",
    type: "",
    loading: false,
    categories: [],
    category: {},
    visibleModal: false,
    column: [
      {
        title: "Kode",
        dataIndex: "kode_kategori",
        key: "kode_kategori",
        width: 150,
      },
      {
        title: "Name",
        dataIndex: "title",
        key: "title",
        width: 350,
      },
      {
        title: "Action",
        key: "action",
        width: 180,
        render: (record) => (
          <Space>
            <Button
              onClick={() => this.showModalEdit(record)}
              type="primary"
              icon={<EditFilled />}
            />
            <Popconfirm
              placement="topRight"
              title="Are you sure gonna delete this category ?"
              onConfirm={() => this.deleteItem(record)}
            >
              <Button type="danger" icon={<DeleteFilled />} />
            </Popconfirm>
          </Space>
        ),
      },
    ],
  };

  showModalEdit = (item) => {
    this.setState({ visibleModal: true, category: { ...item }, type: "edit" });
  };

  showModalInsert = () => {
    this.setState({ visibleModal: true, type: "insert" });
  };

  cancelModalEdit = () => this.setState({ visibleModal: false, category: {} });

  okModal = () => {
    this.setState({ loading: true });
    if (this.state.type === "edit") {
      const { kode_kategori } = this.state.category;
      axios
        .put(
          `${REACT_APP_API_HOST}/category/${kode_kategori}`,
          this.state.category
        )
        .then(({ data }) => {
          if (data.success) {
            this.getCategories();
          }
          this.setState({ loading: false, visibleModal: false });
        })
        .catch((e) => {
          console.log(e);
          this.setState({ loading: false });
        });
    } else {
      const { title } = this.state;

      axios
        .post(`${REACT_APP_API_HOST}/category`, { title })
        .then(({ data }) => {
          if (data.success) {
            this.getCategories();
          }
          this.setState({ loading: false, visibleModal: false, title: "" });
        })
        .catch((e) => {
          console.log(e);
          this.setState({ loading: false });
        });
    }
  };

  getCategories = () => {
    axios
      .get(REACT_APP_API_HOST + "/category")
      .then(({ data }) => {
        this.setState({
          categories: data.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteItem = (item) => {
    const reload = this.getCategories;
    confirm({
      centered: true,
      title: "Delete category !",
      icon: <ExclamationCircleFilled />,
      content:
        "You gonna delete products from this category too, are you sure ?",
      onOk() {
        return axios
          .delete(`${REACT_APP_API_HOST}/category/${item.kode_kategori}`)
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

  onChangeValue = (e) => {
    this.setState({
      category: {
        ...this.state.category,
        title: e.target.value,
      },
    });
  };

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const { category, type } = this.state;
    return (
      <Card className="style__card">
        <CardHeader
          title="Category"
          desc="Manage category products that you have"
        />
        <Divider orientation="left" plain>
          Manage categories
        </Divider>
        <Button
          onClick={this.showModalInsert}
          style={{ marginBottom: "15px" }}
          type="primary"
          icon={<PlusSquareFilled />}
        >
          Add new categories
        </Button>
        <Row>
          <Col>
            <Table
              scroll={{ x: 400 }}
              dataSource={this.state.categories}
              columns={this.state.column}
              rowKey={(record) => record.kode_kategori}
              footer={() => (
                <p style={{ fontSize: "16px", textAlign: "right" }}>
                  You have: <b>{this.state.categories.length}</b> category
                </p>
              )}
              pagination={false}
            />
          </Col>
        </Row>
        <Modal
          title={type === "edit" ? "Update category" : "Add new category"}
          visible={this.state.visibleModal}
          footer={null}
          onCancel={this.cancelModalEdit}
        >
          <span>Title category</span>
          <Input
            placeholder="Title"
            value={
              type === "edit"
                ? category && category.title && category.title
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

export default Category;
