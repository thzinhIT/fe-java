import { useState, useEffect } from "react";
import "./ConsultingStaff.css";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}//consulting-staff`;
const ConsultingStaff = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [maintainces, setMaintainces] = useState([]);
  const [selectedMaintaince, setSelectedMaintaince] = useState(null);

  const [isCreateInvoice, setIsCreateInvoiceVisible] = useState(false);

  const [isQuotationFormVisible, setIsQuotationFormVisible] = useState(false);
  const [isUpdateOrder, setIsUpdateOrderVisible] = useState(false);
  const [quotationData, setQuotationData] = useState({
    areaSize: "", // Số
    location: "", // Chuỗi
    designDetails: "", // Chuỗi
    materialCost: "", // Số
    laborCost: "", // Số
    transportationCost: "", // Số
    totalCost: "", // Số
    quotationDate: "", // Ngày định dạng ISO (YYYY-MM-DD)
    expirationDate: "", // Ngày định dạng ISO (YYYY-MM-DD)
  });

  const [invoiceData, setInvoiceData] = useState({
    price: 0,
    constructionStaff: "",
    endDate: "",
    content: "",
  });

  const [orderUpdateData, setOrderUpdateData] = useState({
    status: "",
  });
  // gửi bảng báo giá
  const handleCreateQuotation = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      // Chuẩn bị dữ liệu gửi
      const formattedQuotationData = {
        areaSize: quotationData.areaSize || 0, // Nếu không có giá trị, mặc định là 0
        location: quotationData.location || "",
        designDetails: quotationData.designDetails || "",
        materialCost: quotationData.materialCost || 0,
        laborCost: quotationData.laborCost || 0,
        transportationCost: quotationData.transportationCost || 0,
        totalCost: quotationData.totalCost || 0,
        quotationDate: formatDate(quotationData.quotationDate), // Chuyển đổi ngày
        expirationDate: formatDate(quotationData.expirationDate), // Chuyển đổi ngày
      };

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }

      // Gửi yêu cầu POST
      console.log(token);

      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/create-quotation/${selectedOrder.orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formattedQuotationData),
        }
      );

      // Kiểm tra phản hồi
      if (response.ok) {
        const result = await response.json();
        alert("Bảng báo giá đã được gửi thành công!");
        console.log("Phản hồi từ server:", result);

        // Reset form sau khi gửi thành công
        setQuotationData({
          areaSize: "",
          location: "",
          designDetails: "",
          materialCost: "",
          laborCost: "",
          transportationCost: "",
          totalCost: "",
          quotationDate: "",
          expirationDate: "",
        });
        setIsQuotationFormVisible(false); // Đóng form
      } else {
        // Nếu phản hồi không thành công, hiển thị lỗi
        const error = await response.text(); // Đọc nội dung lỗi từ server
        console.error("Lỗi từ server:", error);
        alert(`Lỗi từ server: ${error}`);
      }
    } catch (err) {
      // Bắt lỗi khi thực thi
      console.error("Lỗi khi gửi dữ liệu:", err);
      alert("Không thể gửi bảng báo giá. Vui lòng thử lại.");
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      const formattedUpdateOrderData = {
        status: orderUpdateData.status,
      };

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }

      // Gửi yêu cầu POST
      console.log(token);

      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/orders/change-status/${selectedOrder.orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formattedUpdateOrderData),
        }
      );

      // Kiểm tra phản hồi
      if (response.ok) {
        const result = await response.json();
        alert("Cập nhật trạng thái đơn hàng thành công!");

        // Reset form sau khi gửi thành công
        setOrderUpdateData({
          status: "",
        });
        setIsUpdateOrderVisible(false); // Đóng form
      } else {
        const error = await response.text(); // Đọc nội dung lỗi từ server
        alert(`Lỗi từ server: ${error}`);
      }
    } catch (err) {
      alert("Không thể gửi bảng báo giá. Vui lòng thử lại.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  // này dùng để login
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8081/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } else {
      alert("Mật khẩu hoặc tài khoản sai");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (currentTab === "maintenances") {
      const fetchMaintenances = async () => {
        try {
          const response = await fetch(
            "http://localhost:8081/api/v1/users/my-maintenance",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setMaintainces(data.data);
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };

      if (isLoggedIn && currentTab === "maintenances") {
        fetchMaintenances();
      }
    } else if (currentTab === "orders") {
      const fetchOrders = async () => {
        try {
          const response = await fetch(
            "http://localhost:8081/api/v1/consulting-staff/orders",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setOrders(data.data);
          }
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      };

      if (isLoggedIn && currentTab === "orders") {
        fetchOrders();
      }
    }
  }, [isLoggedIn, currentTab]);

  const handleCreateInvoice = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      // Chuẩn bị dữ liệu gửi
      const formattedInvoiceData = {
        price: invoiceData.price,
        endDate: formatDate(invoiceData.endDate),
        content: invoiceData.content,
        constructionStaff: invoiceData.constructionStaff,
      };

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }

      // Gửi yêu cầu POST
      console.log(token);

      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/create-maintenance/${selectedOrder.orderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formattedInvoiceData),
        }
      );

      // Kiểm tra phản hồi
      if (response.ok) {
        const result = await response.json();
        alert("Tạo đơn thành công");

        // Reset form sau khi gửi thành công
        setInvoiceData({
          price: 0,
          endDate: "",
          content: "",
          constructionStaff: "",
        });
        setIsCreateInvoiceVisible(false); // Đóng form
      } else {
        // Nếu phản hồi không thành công, hiển thị lỗi
        const error = await response.text(); // Đọc nội dung lỗi từ server
        console.error("Lỗi từ server:", error);
        alert(`Lỗi từ server: ${error}`);
      }
    } catch (err) {
      // Bắt lỗi khi thực thi
      console.error("Lỗi khi gửi dữ liệu:", err);
      alert("Không thể gửi bảng báo giá. Vui lòng thử lại.");
    }
  };

  const handleOrderClick = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Kiểm tra xem dữ liệu trả về đúng chưa
        setSelectedOrder(data.data); // Lấy chính xác thuộc tính nếu cần
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }

  const handleMaintainClick = async (maintainId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/v1/consulting-staff/maintenance/${maintainId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedMaintaince(data.data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };
  if (!isLoggedIn) {
    return (
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    );
  }

  return (
    <div
      className={`management-page ${selectedOrder ? "blur-background" : ""}`}
    >
      <div className="header">
        <button onClick={handleLogout} className="btn-logout">
          Đăng xuất
        </button>
      </div>
      <div className="sidebar">
        <h2>Quản lý</h2>
        <ul>
          <li
            className={currentTab === "orders" ? "active" : ""}
            onClick={() => setCurrentTab("orders")}
          >
            Quản lý đơn hàng
          </li>
          <li
            className={currentTab === "maintenances" ? "active" : ""}
            onClick={() => setCurrentTab("maintenances")}
          >
            Quản lý bảo trì
          </li>
        </ul>
      </div>

      <div className="main-content">
        {currentTab === "orders" && (
          <section className="order-management">
            <div className="order-header">
              <h3>Danh sách đơn hàng</h3>
            </div>
            <div className="order-list">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="order-item"
                  onClick={() => handleOrderClick(order.orderId)}
                >
                  <strong>User ID: {order.userId}</strong>
                  <p>Khách hàng: {order.userName}</p>
                  <p>Chi tiết thiết kế: {order.designDetails}</p>
                </div>
              ))}
            </div>

            {selectedOrder && (
              <div className="order-details">
                <h3>Chi tiết đơn hàng</h3>
                <button
                  className="create-invoice-btn"
                  onClick={() => {
                    setIsCreateInvoiceVisible(true);
                  }}
                >
                  Tạo mới
                </button>
                {isCreateInvoice && (
                  <div className="order-details">
                    <h4>Taọ mới hóa đơn</h4>
                    <form onSubmit={handleCreateInvoice}>
                      <input
                        type="text"
                        placeholder="Nhân viên thi công"
                        value={invoiceData.constructionStaff}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            constructionStaff: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Nội dung"
                        value={invoiceData.content}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            content: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        placeholder="Giá thành"
                        value={invoiceData.price}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            price: e.target.value,
                          })
                        }
                      />
                      <input
                        type="date"
                        placeholder="ngày kết thúc"
                        value={invoiceData.endDate}
                        onChange={(e) =>
                          setInvoiceData({
                            ...invoiceData,
                            endDate: e.target.value,
                          })
                        }
                      />
                      {/* Thêm các input khác cho form */}
                      <button type="submit">Tạo</button>
                      <button
                        onClick={() => {
                          setIsCreateInvoiceVisible(false);
                        }}
                      >
                        Đóng
                      </button>
                    </form>
                  </div>
                )}
                <p>
                  <strong> Đơn hàng số:</strong> {selectedOrder.orderNumber}
                </p>
                <p>
                  <strong>ID đơn hàng:</strong> {selectedOrder.orderId}
                </p>
                <p>
                  <strong>Trạng thái:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Mã khách hàng:</strong> {selectedOrder.userId}
                </p>
                <p>
                  <strong>Khách hàng:</strong> {selectedOrder.userName}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {selectedOrder.userPhone}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {selectedOrder.address}
                </p>
                <p>
                  <strong>Ngày bắt đầu:</strong> {selectedOrder.startDate}
                </p>
                <p>
                  <strong>Ngày kết thúc:</strong> {selectedOrder.endDate}
                </p>
                <p>
                  <strong>Dịch vụ:</strong> {selectedOrder.serviceType}
                </p>
                <p>
                  <strong>Chi tiết thiết kế:</strong>{" "}
                  {selectedOrder.designDetails}
                </p>
                <button
                  onClick={() => {
                    setSelectedOrder(null);
                    setIsQuotationFormVisible(false); // Cập nhật trạng thái thành false
                    setIsUpdateOrderVisible(false);
                  }}
                >
                  Đóng
                </button>
                <div>
                  <button onClick={() => setIsQuotationFormVisible(true)}>
                    Lập bảng báo giá
                  </button>
                  <button onClick={() => setIsUpdateOrderVisible(true)}>
                    Cập nhật trạng thái
                  </button>

                  {isUpdateOrder && (
                    <div className="quotation-form">
                      <h4>Cập nhật trạng thái đơn hàng</h4>
                      <form onSubmit={handleUpdateOrder}>
                        <select
                          value={orderUpdateData.status}
                          onChange={(e) =>
                            setOrderUpdateData({
                              ...orderUpdateData,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                        <button type="submit">
                          Thay đổi trạng thái đơn hàng
                        </button>
                      </form>
                    </div>
                  )}

                  {isQuotationFormVisible && (
                    <div className="quotation-form">
                      <h4>Lập bảng báo giá</h4>
                      <form onSubmit={handleCreateQuotation}>
                        <input
                          type="number"
                          placeholder="Diện tích"
                          value={quotationData.areaSize}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              areaSize: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Vị trí"
                          value={quotationData.location}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              location: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="chi tiết thiết kế"
                          value={quotationData.designDetails}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              designDetails: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="Chi phí vật liệu"
                          value={quotationData.materialCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              materialCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="Chi phí lao động"
                          value={quotationData.laborCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              laborCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="chi phí vận chuyên"
                          value={quotationData.transportationCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              transportationCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="tổng chi phí"
                          value={quotationData.totalCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              totalCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="date"
                          placeholder="ngày bắt đầu"
                          value={quotationData.quotationDatet}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              quotationDate: e.target.value,
                            })
                          }
                        />
                        <input
                          type="date"
                          placeholder="ngày kết thúc"
                          value={quotationData.expirationDate}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              expirationDate: e.target.value,
                            })
                          }
                        />
                        {/* Thêm các input khác cho form */}
                        <button type="submit">Xác nhận bảng báo giá</button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* maintain tab */}
        {currentTab === "maintenances" && (
          <section className="order-management">
            <div className="order-header">
              <h3>Danh sách bảo trì</h3>
            </div>
            <div className="order-list">
              {maintainces.map((maintain) => (
                <div
                  key={maintain.maintenanceID}
                  className="order-item"
                  onClick={() => handleMaintainClick(maintain.maintenanceID)}
                >
                  <strong>Maintaince ID: {maintain.maintenanceID}</strong>
                  <p>Tiêu đề: {maintain.title}</p>
                  <p>Giá thành: {maintain.price}</p>
                </div>
              ))}
            </div>
            {selectedMaintaince && (
              <div className="order-details">
                <h3>Chi tiết bảo trì</h3>
                <p>
                  <strong> ID bảo trì:</strong>{" "}
                  {selectedMaintaince.maintenanceID}
                </p>
                <p>
                  <strong>Tiêu đề:</strong> {selectedMaintaince.title}
                </p>
                <p>
                  <strong>Nội dung:</strong> {selectedMaintaince.content}
                </p>
                <p>
                  <strong>Giá thành:</strong> {selectedMaintaince.price}
                </p>
                <p>
                  <strong>ID user:</strong> {selectedMaintaince.userId}
                </p>
                <p>
                  <strong>Nhân viên thi công:</strong>{" "}
                  {selectedMaintaince.constructionStaff}
                </p>
                <p>
                  <strong>Ngày bắt đầu:</strong> {selectedMaintaince.startDate}
                </p>
                <p>
                  <strong>Ngày kết thúc:</strong> {selectedMaintaince.endDate}
                </p>
                <button
                  onClick={() => {
                    setSelectedMaintaince(null);
                  }}
                >
                  Đóng
                </button>
                <div>
                  {isUpdateOrder && (
                    <div className="quotation-form">
                      <h4>Cập nhật trạng thái đơn hàng</h4>
                      <form onSubmit={handleUpdateOrder}>
                        <select
                          value={orderUpdateData.status}
                          onChange={(e) =>
                            setOrderUpdateData({
                              ...orderUpdateData,
                              status: e.target.value,
                            })
                          }
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                        <button type="submit">
                          Thay đổi trạng thái đơn hàng
                        </button>
                      </form>
                    </div>
                  )}

                  {isQuotationFormVisible && (
                    <div className="quotation-form">
                      <h4>Lập bảng báo giá</h4>
                      <form onSubmit={handleCreateQuotation}>
                        <input
                          type="number"
                          placeholder="Diện tích"
                          value={quotationData.areaSize}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              areaSize: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="Vị trí"
                          value={quotationData.location}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              location: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          placeholder="chi tiết thiết kế"
                          value={quotationData.designDetails}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              designDetails: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="Chi phí vật liệu"
                          value={quotationData.materialCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              materialCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="Chi phí lao động"
                          value={quotationData.laborCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              laborCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="chi phí vận chuyên"
                          value={quotationData.transportationCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              transportationCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="number"
                          placeholder="tổng chi phí"
                          value={quotationData.totalCost}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              totalCost: e.target.value,
                            })
                          }
                        />
                        <input
                          type="date"
                          placeholder="ngày bắt đầu"
                          value={quotationData.quotationDatet}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              quotationDate: e.target.value,
                            })
                          }
                        />
                        <input
                          type="date"
                          placeholder="ngày kết thúc"
                          value={quotationData.expirationDate}
                          onChange={(e) =>
                            setQuotationData({
                              ...quotationData,
                              expirationDate: e.target.value,
                            })
                          }
                        />
                        {/* Thêm các input khác cho form */}
                        <button type="submit">Xác nhận bảng báo giá</button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
export default ConsultingStaff;
