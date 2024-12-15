<template>
  <div class="relative rounded-3xl">
    <button @click="toggleDropdown" class="relative rounded-3xl">
      Notifications
      <span v-if="pendingRatings.length" class="absolute top-0 right-0 bg-red-500 text-white rounded-3xl px-2 py-1 text-xs">{{ pendingRatings.length }}</span>
    </button>
    <div v-if="showDropdown" class="absolute right-0 mt-2 w-64 bg-black border border-gray-300 rounded-3xl shadow-lg overflow-hidden z-20">
      <div v-if="loading" class="p-4 text-center text-gray-500">Loading...</div>
      <div v-else-if="error" class="p-4 text-center text-red-500">{{ error }}</div>
      <div v-else>
        <div v-for="rating in pendingRatings" :key="rating.order_id" class="p-4 border-b border-gray-200">
          <p class="font-semibold">{{ rating.food_title }}</p>
          <p class="text-sm text-gray-600">{{ rating.food_desc }}</p>
          <p class="text-sm text-gray-600">By: {{ rating.producer_name }}</p>
          <p class="text-sm text-gray-600">Order Date: {{ new Date(rating.order_date).toLocaleDateString() }}</p>
          <div class="flex mt-2">
            <span v-for="star in 5" :key="star" @click="selectStars(rating.order_id, star)" :class="{ 'text-yellow-500': star <= rating.selectedStars, 'text-gray-300': star > rating.selectedStars }" class="cursor-pointer text-xl">★</span>
          </div>
          <button v-if="rating.selectedStars > 0" @click="rateOrder(rating.order_id, rating.selectedStars)" class="mt-2 bg-blue-500 text-white py-1 px-3 rounded-3xl hover:bg-blue-600">Rate Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  data() {
    return {
      showDropdown: false,
      pendingRatings: [],
      loading: false,
      error: null,
    };
  },
  setup() {
    const store = inject('store');
    return { store };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      if (this.showDropdown) {
        this.fetchPendingRatings();
      }
    },
    async fetchPendingRatings() {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(`https://navobackend.onrender.com/api/showallorder/${this.store.user._id}`, {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        
        this.pendingRatings = data.map(order => ({
          order_id: order.order_id,
          food_title: order.food_title,
          food_desc: order.food_desc,
          producer_name: order.producer_name,
          order_date: order.order_date,
          selectedStars: 0,
        }));
      } catch (err) {
        console.error('Error fetching pending ratings:', err);
        this.error = 'Error fetching pending ratings';
      } finally {
        this.loading = false;
      }
    },
    selectStars(orderId, stars) {
      const order = this.pendingRatings.find(rating => rating.order_id === orderId);
      if (order) {
        order.selectedStars = stars;
      }
    },
    async rateOrder(orderId, stars) {
      try {
        const response = await fetch(`https://navobackend.onrender.com/api/addrating/${orderId}/${stars}`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error('Failed to rate order');
        }
        // Remove the rated order from the pendingRatings array
        this.pendingRatings = this.pendingRatings.filter(rating => rating.order_id !== orderId);
      } catch (error) {
        console.error('Error rating order:', error);
        alert('Failed to rate order');
      }
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
}

.loading {
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

.rating-item {
  margin-bottom: 10px;
}

.stars {
  display: flex;
}

.stars span {
  cursor: pointer;
  font-size: 20px;
  color: #ccc;
}

.stars span.text-yellow-500 {
  color: gold;
}
</style>