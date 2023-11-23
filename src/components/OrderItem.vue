<!-- OrderItem.vue -->
<template>
  <div>
    <h3>Order #{{ order.id }}</h3>
    <ul>
      <li v-for="item in order.items" :key="item.id">{{ item.name }} - {{ item.price }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    order: Object,
  },
};
</script>

  