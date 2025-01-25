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
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Title Section */}
      <Row justify="center" className="mb-6">
        <Col>
          <Title level={2} className="text-gray-700 font-bold">
            Buyer Management
          </Title>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Buyer Details */}
        <Col xs={24} md={8}>
          <Card
            title="Selected Buyer"
            bordered={false}
            className="shadow-lg h-full"
          >
            {selectedBuyer ? (
              <>
                <div className="mb-2">
                  <strong>Name:</strong> {selectedBuyer?.name || "-"}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {selectedBuyer?.email || "-"}
                </div>
                <div className="mb-2">
                  <strong>Address:</strong> {selectedBuyer?.address || "-"}
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong> {selectedBuyer?.phone || "-"}
                </div>
                <div className="mb-2">
                  <strong>Diamond Type:</strong>{" "}
                  {selectedBuyer?.diamondPurchase?.diamondType || "-"}
                </div>
                <div className="mb-2">
                  <strong>Diamond Price:</strong> $
                  {selectedBuyer?.diamondPurchase?.price || "-"}
                </div>
                <div className="mb-4">
                  <Input
                    type="number"
                    value={extraCharge}
                    onChange={handleExtraChargeChange}
                    addonBefore="Extra Charges: $"
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  type="primary"
                  className="w-full font-semibold"
                  disabled={!selectedBuyer}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <div className="text-gray-500">
                Select a buyer to view details.
              </div>
            )}
          </Card>
        </Col>

        {/* Table and Actions */}
        <Col xs={24} md={16}>
          <Card bordered={false} className="shadow-lg">
            <div className="flex flex-wrap justify-end gap-4 mb-4">
              <Button
                onClick={generateExcel}
                type="primary"
                className="bg-green-500 text-white font-semibold"
              >
                Download Excel
              </Button>
              <Button
                onClick={handleEmail}
                type="primary"
                className="bg-blue-500 text-white font-semibold"
              >
                Send Email
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={buyers}
              rowSelection={{
                type: "radio",
                onChange: handleRowSelection,
              }}
              rowKey="id"
              pagination={{ pageSize: 2 }}
              scroll={{ x: "100%" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BuyersList;
