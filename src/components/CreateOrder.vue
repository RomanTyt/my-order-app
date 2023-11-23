<!-- CreateOrder.vue -->
<template>
  <div>
    <h2>Create Order</h2>
    <p class="time-display">{{ currentTime }}</p>
    <form @submit.prevent="submitOrder" class="order-form">
      <div class="form-group">
        <div class="label-input-group">
          <label for="customerName">Customer Name:</label>
          <input type="text" id="customerName" v-model="order.customerName" required />
        </div>
      </div>

      <div class="form-group">
        <div class="label-input-group">
          <label for="customerAddress">Customer Address:</label>
          <input type="text" id="customerAddress" v-model="order.customerAddress" required />
        </div>
      </div>

      <div class="form-group">
        <div class="label-input-group">
          <label for="totalOrderAmount">Total Order Amount:</label>
          <input type="number" id="totalOrderAmount" v-model="order.totalOrderAmount" required />
        </div>
      </div>

      <div class="form-group">
        <button type="submit">Submit Order</button>
      </div>
      
      <!-- Добавленная кнопка для возврата на главную страницу -->
      <router-link to="/">
        <button>Go to Home</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {
        customerName: "",
        customerAddress: "",
        totalOrderAmount: 0,
        dateOfCreation: null,
      },
      currentTime: null,
    };
  },
  created() {
    // Загрузка даты при создании компонента
    this.loadDateOfCreation();
    this.loadTime();
  },
  methods: {
    async submitOrder() {
      try {
        const response = await axios.post('http://localhost:8282/api/v1/orders', {
          customerName: this.order.customerName,
          customerAddress: this.order.customerAddress,
          totalOrderAmount: this.order.totalOrderAmount,
          dateOfCreation: this.order.dateOfCreation,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Order submitted successfully:', response.data);
      } catch (error) {
        console.error('Error submitting order:', error);
      } finally {
        // Обновление даты и времени после завершения запроса
        this.loadDateOfCreation();
        this.loadTime();
      }
    },
    async loadDateOfCreation() {
      try {
        const response = await axios.get('http://localhost:8181/api/v1/times');
        this.order.dateOfCreation = response.data;
      } catch (error) {
        console.error('Error loading date of creation:', error);
      }
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
.order-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 1 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.label-input-group {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Выравнивание меток и полей ввода по вертикали */
}

.label-input-group label {
  flex: 3; /* Метка занимает 1/3 ширины, можно настроить под ваши требования */
  margin-right: 10px;
}

.label-input-group input {
  flex: 4; /* Поле ввода занимает 2/3 ширины, можно настроить под ваши требования */
}

button {
  align-self: flex-end;
}

/* Добавленный стиль для перемещения заголовка в левую часть */
h2 {
  text-align: left;
}

/* Добавленный стиль для отображения времени под заголовком */
.time-display {
  text-align: left;
  font-style: italic;
  margin-bottom: 10px;
}

/* Добавьте любые другие стили, если необходимо */
</style>
