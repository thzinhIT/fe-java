// import { useState } from "react";
// import "./ConsultingStaff.css";

// const ConsultingStaff = () => {
//   const [currentTab, setCurrentTab] = useState("orders");
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       name: "Đơn hàng A",
//       status: "Chờ xác nhận",
//       description: "Mô tả đơn hàng A",
//     },
//     {
//       id: 2,
//       name: "Đơn hàng B",
//       status: "Đang xử lý",
//       description: "Mô tả đơn hàng B",
//     },
//     {
//       id: 3,
//       name: "Đơn hàng C",
//       status: "Đã hoàn thành",
//       description: "Mô tả đơn hàng C",
//     },
//   ]);
//   const [maintenances, setMaintenances] = useState([
//     {
//       id: 101,
//       customer: "Khách hàng X",
//       description: "Bảo trì máy A",
//       status: "Chờ xử lý",
//     },
//     {
//       id: 102,
//       customer: "Khách hàng Y",
//       description: "Bảo trì máy B",
//       status: "Đang xử lý",
//     },
//   ]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedMaintenance, setSelectedMaintenance] = useState(null);
//   const [status, setStatus] = useState("");
//   const [searchId, setSearchId] = useState("");

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//     setStatus(order.status);
//     setSelectedMaintenance(null);
//   };

//   const handleMaintenanceClick = (maintenance) => {
//     setSelectedMaintenance(maintenance);
//     setStatus(maintenance.status);
//     setSelectedOrder(null);
//   };

//   const handleGenerateQuote = () => {
//     alert("Bảng báo giá đã được lập!");
//   };

//   const handleStatusChange = (e) => {
//     setStatus(e.target.value);
//   };

//   const handleSaveStatus = () => {
//     const updateItem = selectedOrder || selectedMaintenance;
//     const updatedList = (selectedOrder ? orders : maintenances).map((item) =>
//       item.id === updateItem.id ? { ...item, status } : item
//     );
//     selectedOrder ? setOrders(updatedList) : setMaintenances(updatedList);
//     alert("Trạng thái đã được cập nhật!");
//   };

//   const filteredMaintenances = maintenances.filter(
//     (maintenance) => searchId === "" || maintenance.id.toString() === searchId
//   );

//   return (
//     <div className="management-page">
//       <div className="sidebar">
//         <h2>Quản lý</h2>
//         <ul>
//           <li
//             className={currentTab === "orders" ? "active" : ""}
//             onClick={() => setCurrentTab("orders")}
//           >
//             Quản lý đơn hàng
//           </li>
//           <li
//             className={currentTab === "maintenance" ? "active" : ""}
//             onClick={() => setCurrentTab("maintenance")}
//           >
//             Quản lý bảo trì
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         {currentTab === "orders" && (
//           <section className="order-management">
//             <div className="order-header">
//               <h3>Danh sách đơn hàng</h3>
//             </div>
//             <div className="order-list">
//               {orders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="order-item"
//                   onClick={() => handleOrderClick(order)}
//                 >
//                   <strong>{order.name}</strong>
//                   <p>Trạng thái: {order.status}</p>
//                 </div>
//               ))}
//             </div>

//             {selectedOrder && (
//               <div className="order-detail">
//                 <h4>Chi tiết đơn hàng: {selectedOrder.name}</h4>
//                 <p>
//                   <strong>Mô tả:</strong> {selectedOrder.description}
//                 </p>
//                 <div className="status-container">
//                   <strong>Trạng thái:</strong>
//                   <div>
//                     <input
//                       type="radio"
//                       id="pending"
//                       name="status"
//                       value="Chờ xác nhận"
//                       checked={status === "Chờ xác nhận"}
//                       onChange={handleStatusChange}
//                     />
//                     <label htmlFor="pending">Chờ xác nhận</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       id="processing"
//                       name="status"
//                       value="Đang xử lý"
//                       checked={status === "Đang xử lý"}
//                       onChange={handleStatusChange}
//                     />
//                     <label htmlFor="processing">Đang xử lý</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       id="completed"
//                       name="status"
//                       value="Đã hoàn thành"
//                       checked={status === "Đã hoàn thành"}
//                       onChange={handleStatusChange}
//                     />
//                     <label htmlFor="completed">Đã hoàn thành</label>
//                   </div>
//                 </div>
//                 <button onClick={handleSaveStatus} className="btn-save">
//                   Lưu trạng thái
//                 </button>
//                 <button onClick={handleGenerateQuote} className="btn-quote">
//                   Lập bảng báo giá
//                 </button>
//               </div>
//             )}
//           </section>
//         )}

//         {currentTab === "maintenance" && (
//           <section className="maintenance-management">
//             <h3>Quản lý bảo trì</h3>
//             <input
//               type="text"
//               placeholder="Tìm đơn bảo trì theo ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//             />
//             <div className="maintenance-list">
//               {filteredMaintenances.map((maintenance) => (
//                 <div
//                   key={maintenance.id}
//                   className="maintenance-item"
//                   onClick={() => handleMaintenanceClick(maintenance)}
//                 >
//                   <strong>ID: {maintenance.id}</strong>
//                   <p>Khách hàng: {maintenance.customer}</p>
//                 </div>
//               ))}
//             </div>

//             {selectedMaintenance && (
//               <div className="maintenance-detail">
//                 <h4>Chi tiết đơn bảo trì: {selectedMaintenance.customer}</h4>
//                 <p>
//                   <strong>Mô tả:</strong> {selectedMaintenance.description}
//                 </p>
//                 <div className="status-container">
//                   <strong>Trạng thái:</strong>
//                   <div>
//                     <input
//                       type="radio"
//                       id="maintenance-pending"
//                       name="maintenance-status"
//                       value="Chờ xử lý"
//                       checked={status === "Chờ xử lý"}
//                       onChange={handleStatusChange}
//                     />
//                     <label htmlFor="maintenance-pending">Chờ xử lý</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       id="maintenance-processing"
//                       name="maintenance-status"
//                       value="Đang xử lý"
//                       checked={status === "Đang xử lý"}
//                       onChange={handleStatusChange}
//                     />
//                     <label htmlFor="maintenance-processing">Đang xử lý</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       id="maintenance-completed"
//                       name="maintenance-status"
//                       value="Hoàn thành"
//                       checked={status === "Hoàn thành"}
//                       onChange={handleStatusChange}
//                     />
//                     <label htmlFor="maintenance-completed">Hoàn thành</label>
//                   </div>
//                 </div>
//                 <button onClick={handleSaveStatus} className="btn-save">
//                   Cập nhật trạng thái
//                 </button>
//                 <button onClick={handleGenerateQuote} className="btn-quote">
//                   Lập bảng báo giá
//                 </button>
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConsultingStaff;

// import { useState, useEffect } from "react";
// import "./ConsultingStaff.css";

// const ConsultingStaff = () => {
//   const [currentTab, setCurrentTab] = useState("orders");
//   const [orders, setOrders] = useState([
//     /* danh sách đơn hàng */
//   ]);
//   const [maintenances, setMaintenances] = useState([
//     /* danh sách bảo trì */
//   ]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedMaintenance, setSelectedMaintenance] = useState(null);
//   const [status, setStatus] = useState("");
//   const [searchId, setSearchId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Kiểm tra trạng thái đăng nhập khi load trang
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   // Hàm đăng nhập
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:8081/api/v1/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       alert("Mật khẩu hoặc tài khoản sai");
//     } else {
//       const data = await response.json();
//       localStorage.setItem("token", data.token);
//       setIsLoggedIn(true);
//       alert("Đăng nhập thành công!");
//     }
//   };

//   // Hàm đăng xuất
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     alert("Bạn đã đăng xuất thành công!");
//   };

//   // Nếu chưa đăng nhập, hiển thị form đăng nhập
//   if (!isLoggedIn) {
//     return (
//       <div className="login-form">
//         <h2>Đăng nhập</h2>
//         <form onSubmit={handleLogin}>
//           <div>
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {errorMessage && <div className="error">{errorMessage}</div>}
//           <button type="submit">Đăng nhập</button>
//         </form>
//       </div>
//     );
//   }

//   // Nếu đã đăng nhập, hiển thị nội dung trang quản lý
//   return (
//     <div className="management-page">
//       <div className="header">
//         <button onClick={handleLogout} className="btn-logout">
//           Đăng xuất
//         </button>
//       </div>
//       <div className="sidebar">
//         <h2>Quản lý</h2>
//         <ul>
//           <li
//             className={currentTab === "orders" ? "active" : ""}
//             onClick={() => setCurrentTab("orders")}
//           >
//             Quản lý đơn hàng
//           </li>
//           <li
//             className={currentTab === "maintenance" ? "active" : ""}
//             onClick={() => setCurrentTab("maintenance")}
//           >
//             Quản lý bảo trì
//           </li>
//         </ul>
//       </div>

//       <div className="main-content">
//         {/* Quản lý đơn hàng và bảo trì */}
//         {currentTab === "orders" && (
//           <section className="order-management">
//             <div className="order-header">
//               <h3>Danh sách đơn hàng</h3>
//             </div>
//             <div className="order-list">
//               {orders.map((order) => (
//                 <div
//                   key={order.id}
//                   className="order-item"
//                   onClick={() => setSelectedOrder(order)}
//                 >
//                   <strong>{order.name}</strong>
//                   <p>Trạng thái: {order.status}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//         {currentTab === "maintenance" && (
//           <section className="maintenance-management">
//             <h3>Quản lý bảo trì</h3>
//             <input
//               type="text"
//               placeholder="Tìm đơn bảo trì theo ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//             />
//             <div className="maintenance-list">
//               {maintenances.map((maintenance) => (
//                 <div
//                   key={maintenance.id}
//                   className="maintenance-item"
//                   onClick={() => setSelectedMaintenance(maintenance)}
//                 >
//                   <strong>ID: {maintenance.id}</strong>
//                   <p>Khách hàng: {maintenance.customer}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ConsultingStaff;
// ==================================================hoàn thành lấy đơn hàng==============
/*import { useState, useEffect } from "react";
import "./ConsultingStaff.css";

const ConsultingStaff = () => {
  const [currentTab, setCurrentTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

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
  }, [isLoggedIn, currentTab]);

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
            className={currentTab === "maintenance" ? "active" : ""}
            onClick={() => setCurrentTab("maintenance")}
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
                <button onClick={() => setSelectedOrder(null)}>Đóng</button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ConsultingStaff;*/
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

  const [isQuotationFormVisible, setIsQuotationFormVisible] = useState(false);
  const [quotationData, setQuotationData] = useState({
    areaSize: 0, // Số
    location: "", // Chuỗi
    designDetails: "", // Chuỗi
    materialCost: 1000000, // Số
    laborCost: 500000, // Số
    transportationCost: 200000, // Số
    totalCost: 1700000, // Số
    quotationDate: "", // Ngày định dạng ISO (YYYY-MM-DD)
    expirationDate: "", // Ngày định dạng ISO (YYYY-MM-DD)
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
        quotationDate: quotationData.quotationDate || "", // Không chuyển đổi ngày
        expirationDate: quotationData.expirationDate || "", // Không chuyển đổi ngày
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
  }, [isLoggedIn, currentTab]);

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
            className={currentTab === "maintenance" ? "active" : ""}
            onClick={() => setCurrentTab("maintenance")}
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
                <button onClick={() => setSelectedOrder(null)}>Đóng </button>
                <div>
                  <button onClick={() => setIsQuotationFormVisible(true)}>
                    Lập bảng báo giá
                  </button>

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
