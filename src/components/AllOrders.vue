<!-- AllOrders.vue -->
<template>
    <div>
      <h2 style="text-align: left;">All Orders</h2>
  
      <!-- Добавленные поля для ввода -->
      <div class="input-container">
        <label for="pageNumber">Page Number:</label>
        <input type="number" id="pageNumber" v-model="pageNumber" />
  
        <label for="pageSize">Page Size:</label>
        <input type="number" id="pageSize" v-model="pageSize" />
  
        <button @click="loadAllOrders">Load Orders</button>
      </div>
  
      <p style="text-align: left;">{{ currentTime }}</p>
  
      <!-- Проверка перед загрузкой заказов -->
      <div v-if="orders.length > 0">
        <div v-for="order in orders" :key="order.orderId" class="order-container">
          <h3>Order Information</h3>
          <table class="order-info-table">
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Customer Address</th>
              <th>Total Order Amount</th>
              <th>Date of Creation</th>
            </tr>
            <tr>
              <td>{{ order.orderId }}</td>
              <td>{{ order.customerName }}</td>
              <td>{{ order.customerAddress }}</td>
              <td>${{ order.totalOrderAmount.toFixed(2) }}</td>
              <td>{{ order.dateOfCreation }}</td>
            </tr>
          </table>
  
          <h3>Order Details</h3>
          <table class="order-details-table">
            <tr>
              <th>Position Number</th>
              <th>Product Serial Number</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
            <tr v-for="product in order.productList" :key="product.positionNumber">
              <td>{{ product.positionNumber }}</td>
              <td>{{ product.productSerialNumber }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ product.quantity }}</td>
            </tr>
          </table>
        </div>
  
        <div class="button-container" style="text-align: left;">
          <!-- Измененный метод загрузки следующей страницы -->
          <button @click="loadMoreOrders">Load More Orders</button>
          <router-link to="/">
            <button>Go to Home</button>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        orders: [],
        currentPage: 0,
        currentTime: null,
        pageNumber: 0,
        pageSize: 10,
      };
    },
    created() {
      // Загрузка времени при создании компонента
      this.loadTime();
    },
    methods: {
      async loadAllOrders() {
        try {
          const response = await axios.get("http://localhost:8282/api/v1/orders/orders", {
            params: {
              page: this.pageNumber,
              size: this.pageSize,
            },
          });
          // Добавляем полученные заказы к существующему массиву
          this.orders = this.orders.concat(response.data);
        } catch (error) {
          console.error('Error loading orders:', error);
        }
      },
      async loadMoreOrders() {
        // Измененная логика загрузки следующей страницы
        this.pageNumber += 1;
        await this.loadAllOrders();
      },
      async loadTime() {
        try {
          const response = await axios.get("http://localhost:8181/api/v1/times");
          this.currentTime = response.data;
        } catch (error) {
          console.error("Error loading time:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .input-container {
    margin-bottom: 20px;
  }
  
  .order-container {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
  }
  
  .order-info-table,
  .order-details-table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
  }
  
  th, td {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .button-container {
    margin-top: 20px;
  }
  
  button {
    margin-right: 10px;
    padding: 8px;
    cursor: pointer;
  }
  </style>
  