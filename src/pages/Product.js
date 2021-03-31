import React, { Component } from "react";
import { Card, Row, Col, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CardHeader from "../components/CardHeader";

class Product extends Component {
  render() {
    return (
      <Card className="style__card">
        <CardHeader title="Product" desc="Manage products that you have" />
        <Row>
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
            <Button size="small" type="primary" icon={<SearchOutlined />}>
              Search
            </Button>
          </Col>
          <Col>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Product;
