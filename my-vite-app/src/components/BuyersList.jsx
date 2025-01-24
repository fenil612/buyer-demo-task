import { useState, useEffect } from "react";
import { Table, Input, Button, Row, Col, Card, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuyers, updateBuyer } from "../redux/buyersReducer";
import * as XLSX from "xlsx";

const { Title } = Typography;

const BuyersList = () => {
  const dispatch = useDispatch();
  const { data: buyers, status } = useSelector((state) => state.buyer);

  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [extraCharge, setExtraCharge] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBuyers());
    }
  }, [dispatch, status]);

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    const buyer = selectedRows[0];
    setSelectedBuyer(buyer);
    setExtraCharge(buyer.extraCharges || 0);
  };

  const handleExtraChargeChange = (e) => setExtraCharge(e.target.value);

  const handleSave = () => {
    if (selectedBuyer) {
      const updatedBuyer = { ...selectedBuyer, extraCharges: extraCharge };
      dispatch(updateBuyer(updatedBuyer));
    }
  };

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(buyers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");
    XLSX.writeFile(workbook, "buyers_data.xlsx");
  };

  const handleEmail = () => {
    const emailSubject = "Buyers Data";
    const emailBody =
      "Please find the attached Excel file containing the buyers' data.";
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div style={{ fontWeight: "bold" }}>{text}</div>,
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
      dataIndex: ["diamondPurchase", "diamondType"],
      key: "diamondPurchase.diamondType",
    },
    {
      title: "Diamond Price",
      dataIndex: ["diamondPurchase", "price"],
      key: "diamondPurchase.price",
      render: (price) => <span style={{ color: "#1890ff" }}>${price}</span>,
    },
    {
      title: "Extra Charges",
      dataIndex: "extraCharges",
      key: "extraCharges",
      render: (charges) => <span style={{ color: "#fa541c" }}>${charges}</span>,
    },
  ];

  return (
    <div style={{ padding: "30px", backgroundColor: "#f4f6f9" }}>
      {/* Title Section */}
      <Row justify="center" style={{ marginBottom: "30px" }}>
        <Col>
          <Title level={2} style={{ color: "#333", fontWeight: "bold" }}>
            Buyer Management
          </Title>
        </Col>
      </Row>

      {/* Buyer Information Section */}
      <Row gutter={16}>
        <Col xs={24} lg={8}>
          {" "}
          {/* Reduced the card width to 8 (instead of 12) */}
          <Card
            title="Selected Buyer"
            bordered={false}
            style={{
              background: "#ffffff",
              padding: "15px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
              height: "100%",
            }}
          >
            {selectedBuyer ? (
              <>
                <div className="py-2">
                  <strong>Name:</strong> {selectedBuyer?.name || "-"}
                </div>
                <div className="py-2">
                  <strong>Email:</strong> {selectedBuyer?.email || "-"}
                </div>
                <div className="py-2">
                  <strong>Address:</strong> {selectedBuyer?.address || "-"}
                </div>
                <div className="py-2">
                  <strong>Phone:</strong> {selectedBuyer?.phone || "-"}
                </div>
                <div className="py-2">
                  <strong>Diamond Type:</strong>{" "}
                  {selectedBuyer?.diamondPurchase?.diamondType || "-"}
                </div>
                <div className="py-2">
                  <strong>Diamond Price:</strong> $
                  {selectedBuyer?.diamondPurchase?.price || "-"}
                </div>
                <div className="py-2">
                  <Input
                    type="number"
                    value={extraCharge}
                    onChange={handleExtraChargeChange}
                    addonBefore="Extra Charges: $"
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </div>
                <Button
                  onClick={handleSave}
                  type="primary"
                  disabled={!selectedBuyer}
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    padding: "12px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <div style={{ color: "#999" }}>
                Select a buyer to view details.
              </div>
            )}
          </Card>
        </Col>

        {/* Table Section */}
        <Col xs={24} lg={16}>
          {" "}
          {/* Table takes up the rest of the space */}
          <Card
            bordered={false}
            style={{
              background: "#ffffff",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
            <Table
              columns={columns}
              dataSource={buyers}
              rowSelection={{
                type: "radio",
                onChange: handleRowSelection,
              }}
              rowKey="id"
              pagination={false}
              style={{ backgroundColor: "#fff" }}
            />
            <div className="flex justify-end gap-x-4 my-4">
              <Button
                onClick={generateExcel}
                type="primary"
                className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold"
              >
                Download Excel
              </Button>
              <Button
                onClick={handleEmail}
                type="primary"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold"
              >
                Send Email with Attachment
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BuyersList;
