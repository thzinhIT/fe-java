import { Button, message, Modal, Input, Upload } from "antd";
import { useState } from "react";

const DesignForm = ({ userId, open, handleClose }) => {
  const [engineerNotes, setEngineerNotes] = useState("");
  const [drawingFile, setDrawingFile] = useState(null);

  const handleFileChange = (file) => {
    setDrawingFile(file);
  };

  const handleSubmit = async () => {
    if (!userId) {
      message.error("Không có userId");
      return;
    }

    if (!drawingFile) {
      message.error("Vui lòng chọn file để upload");
      return;
    }

    const formData = new FormData();
    formData.append("engineerNotes", engineerNotes);
    formData.append("drawingFile", drawingFile);

    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZXNpZ25AZ21haWwuY29tIiwicm9sZSI6IlJPTEVfREVTSUdOX1NUQUZGIiwiZXhwIjoxNzMxNzYyODgwfQ.Zl7Sz-ruFZ8P39IgruE8aURE00U0VrXYX0ZdARUA1CSuY6Fr_DcUGa7d6xaeHpITxWO2IQ0f8aPZ791G66FPNg"; // Lấy token từ localStorage

    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/designs/create/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        message.success("Gửi dữ liệu thành công!");
        handleClose(); // Đóng modal sau khi gửi thành công
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null} // Tùy chỉnh nút footer của modal
      title="Gửi Thiết Kế"
    >
      <form>
        <Input
          type="text"
          placeholder="Mô tả"
          value={engineerNotes}
          onChange={(e) => setEngineerNotes(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />

        <Upload
          beforeUpload={(file) => {
            handleFileChange(file);
            return false; // Ngăn không để Upload tự động
          }}
          showUploadList={false} // Không hiển thị danh sách file được chọn
        >
          <Button>Chọn File</Button>
        </Upload>

        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: "1rem" }}
        >
          Gửi
        </Button>
      </form>
    </Modal>
  );
};

export default DesignForm;
