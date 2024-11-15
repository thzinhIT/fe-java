import axios from "axios";

const fetchOrders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8081/api/v1/consulting-staff/orders"
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
