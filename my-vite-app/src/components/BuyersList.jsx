import { useState, useEffect } from "react";
import { Table, Input, Button, Form, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuyers, updateBuyer } from "../redux/buyersReducer";
import * as XLSX from "xlsx";

const BuyersList = () => {
  const dispatch = useDispatch();
  const { data: buyers, status } = useSelector((state) => state.buyer);

  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [extraCharge, setExtraCharge] = useState(0);

  // Fetch buyers when the component mounts
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBuyers());
    }
  }, [dispatch, status]);

  // Handle row selection
  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      const buyer = selectedRows[0];
      setSelectedBuyer(buyer);
      setExtraCharge(buyer.extraCharges); // Set the initial extra charge from selected buyer
    }
  };

  // Handle extra charge change
  const handleExtraChargeChange = (e) => {
    setExtraCharge(e.target.value);
  };

  // Handle Save button click
  const handleSave = () => {
    if (selectedBuyer) {
      const updatedBuyer = {
        ...selectedBuyer,
        extraCharges: extraCharge,
      };

      // Dispatch update buyer
      dispatch(updateBuyer(updatedBuyer));
    }
  };

  // Generate Excel file from buyers data
  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(buyers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");

    // Save the Excel file
    XLSX.writeFile(workbook, "buyers_data.xlsx");
  };

  // Handle email sending (this part should be handled server-side)
  const handleEmail = () => {
    // Example: open default email client with an attachment
    const emailSubject = "Buyers Data";
    const emailBody =
      "Please find the attached Excel file containing the buyers' data.";
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink; // Opens default email client (no attachment via mailto)
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Diamond Type",
      dataIndex: "diamondPurchase.diamondType",
      key: "diamondPurchase.diamondType",
    },
    {
      title: "Diamond Price",
      dataIndex: "diamondPurchase.price",
      key: "diamondPurchase.price",
      render: (price) => `$${price}`,
    },
    {
      title: "Extra Charges",
      dataIndex: "extraCharges",
      key: "extraCharges",
      render: (charges) => `$${charges}`,
    },
  ];

  return (
    <div>
      {/* Search Section */}
      <Row gutter={16}>
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item label="Selected Buyer">
              {selectedBuyer ? (
                <>
                  <div>Name: {selectedBuyer.name}</div>
                  <div>Email: {selectedBuyer.email}</div>
                  <div>Address: {selectedBuyer.address}</div>
                  <div>Phone: {selectedBuyer.phone}</div>
                  <div>
                    Diamond Type: {selectedBuyer.diamondPurchase.diamondType}
                  </div>
                  <div>
                    Diamond Price: ${selectedBuyer.diamondPurchase.price}
                  </div>
                  <div>
                    <Input
                      type="number"
                      value={extraCharge}
                      onChange={handleExtraChargeChange}
                      addonBefore="Extra Charges: $"
                    />
                  </div>
                </>
              ) : (
                <div>Select a buyer to view details.</div>
              )}
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Button onClick={handleSave} type="primary" disabled={!selectedBuyer}>
            Save Changes
          </Button>
        </Col>
      </Row>

      {/* Table Section */}
      <Table
        columns={columns}
        dataSource={buyers}
        rowSelection={{
          type: "radio",
          onChange: handleRowSelection,
        }}
        rowKey="id"
        pagination={false}
      />

      {/* Actions */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Button onClick={generateExcel} type="primary">
            Download Excel
          </Button>
        </Col>
        <Col span={12}>
          <Button onClick={handleEmail} type="primary">
            Send Email with Attachment
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BuyersList;
