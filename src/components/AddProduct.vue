<!-- AddProduct.vue -->
<template>
    <div>
      <h2>Add Product</h2>
      <form @submit.prevent="addProduct" class="order-form">
        <div class="form-group">
          <div class="label-input-group">
            <label for="orderId">Order ID:</label>
            <input type="number" id="orderId" v-model="orderId" required />
          </div>
        </div>
 
        <div class="form-group">
          <div class="label-input-group">
            <label for="positionNumber">Position Number:</label>
            <input type="number" id="positionNumber" v-model="product.positionNumber" required />
          </div>
        </div>
  
        <div class="form-group">
          <div class="label-input-group">
            <label for="productSerialNumber">Product Serial Number:</label>
            <input type="text" id="productSerialNumber" v-model="product.productSerialNumber" required />
          </div>
        </div>
  
        <div class="form-group">
          <div class="label-input-group">
            <label for="productName">Product Name:</label>
            <input type="text" id="productName" v-model="product.productName" required />
          </div>
        </div>
  
        <div class="form-group">
          <div class="label-input-group">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" v-model="product.quantity" required />
          </div>
        </div>
  
        <div class="form-group">
          <button type="submit">Add Product</button>
        </div>
              <!-- Перемещенная кнопка "Go to Home" под кнопку "Add Product" -->
        <div class="form-group">
          <router-link to="/" class="home-button">
            <button>Go to Home</button>
          </router-link>
        </div>    
    </form>
    </div>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        orderId: null,
        product: {
          positionNumber: 0,
          productSerialNumber: "",
          productName: "",
          quantity: 0,
        },
      };
    },
    methods: {
      async addProduct() {
        try {
          const response = await axios.post(`http://localhost:8282/api/v1/orders/${this.orderId}/products`, this.product, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          console.log('Product added successfully:', response.data);
        } catch (error) {
          console.error('Error adding product:', error);
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
  
  label {
    flex: 3; /* Метка занимает 1/3 ширины, можно настроить под ваши требования */
    margin-right: 10px;
  }
  
  input {
    flex: 4; /* Поле ввода занимает 2/3 ширины, можно настроить под ваши требования */
  }
  
  button {
    align-self: flex-end;
  }
  
  /* Стиль для перемещения кнопки "Go to Home" левее */
/* Стиль для перемещения кнопки "Go to Home" левее */
.home-button button {
  margin-top: 10px; /* добавим отступ сверху для выравнивания с другими элементами */
  text-align: left; /* выравнивание текста влево */
  margin-right: auto; /* Отодвигаем кнопку влево */
}

  
  /* Добавленный стиль для перемещения заголовка в левую часть */
  h2 {
    text-align: left;
  }
  
  /* Добавьте любые другие стили, если необходимо */
  </style>
  