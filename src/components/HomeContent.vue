<!-- HomeContent.vue -->
<template>
  <div class="home-page">
    <h2>Home Page</h2>
    <p>{{ currentTime }}</p>
    <div class="button-container">
      <router-link to="/create-order">
        <button>Create Order</button>
      </router-link>
      <router-link to="/add-product">
        <button>Add Product</button>
      </router-link>
      <router-link to="/view-order">
        <button>View Order</button>
      </router-link>
      <router-link to="/all-orders">
        <button>All Orders</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentTime: null,
    };
  },
  created() {
    this.loadTime();
  },
  methods: {
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
.home-page {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.button-container {
  display: flex;
  flex-direction: row;
  margin-top: 10px; /* Регулируйте это значение в зависимости от вашего предпочтения */
}

.button-container button {
  margin-right: 10px; /* Регулируйте это значение в зависимости от вашего предпочтения */
}

/* Добавьте стили, если необходимо */
</style>
