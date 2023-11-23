<!-- ViewOrder.vue -->
<template>
  <div>
    <h2 style="text-align: left;">Order Details</h2>
    <form @submit.prevent="loadOrderById" style="text-align: left;">
      <label for="orderId">Enter Order ID: </label>
      <input type="text" id="orderId" v-model="orderId" />
      <button type="submit" style="margin-right: 10px;">Load Order</button>
      <router-link to="/" style="text-decoration: none;">
        <button style="margin-bottom: 10px;">Go to Home</button>
      </router-link>
    </form>

    <div v-if="order">
      <h3>Order Information</h3>
      <table>
        <tr>
          <th>Order ID</th>
          <th>Customer Name</th>
          <th>Customer Address</th>
          <th>Total Order Amount</th>
          <th>Date of Creation</th>
        </tr>
        <tr>
          <td>{{ orderId }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.customerAddress }}</td>
          <td>${{ order.totalOrderAmount.toFixed(2) }}</td>
          <td>{{ order.dateOfCreation }}</td>
        </tr>
      </table>

      <h3>Order Details</h3>
      <table>
        <tr>
          <th>Position Number</th>
          <th>Product Serial Number</th>
          <th>Product Name</th>
          <th>Quantity</th>
        </tr>
        <tr v-for="detail in orderDetails" :key="detail.positionNumber">
          <td>{{ detail.positionNumber }}</td>
          <td>{{ detail.productSerialNumber }}</td>
          <td>{{ detail.productName }}</td>
          <td>{{ detail.quantity }}</td>
        </tr>
      </table>
    </div>

    <div v-if="error" style="text-align: left;">
      {{ error }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orderId: "",
      order: null,
      orderDetails: [],
      error: null,
    };
  },
  methods: {
    async loadOrderById() {
      try {
        const orderResponse = await axios.get(`http://localhost:8282/api/v1/orders/${this.orderId}`);
        const detailsResponse = await axios.get(`http://localhost:8282/api/v1/orders/${this.orderId}/products`);

        this.order = orderResponse.data;
        this.orderDetails = detailsResponse.data;
        this.error = null;
        
        // this.orderId = "";  // Опционально: очистить поле формы
      } catch (error) {
        this.order = null;
        this.orderDetails = [];
        this.error = "Error loading order. Please check the Order ID.";
        console.error("Error loading order", error);
      }
    },
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
