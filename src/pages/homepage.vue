<template>
  <div>
    <h1 class="text-xl font-questrial mb-8 text-left text-primary">Choose your food from the options below</h1>
    <!-- Show loading message -->
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <!-- Show error message -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <!-- Render food list -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <FoodCard
        v-for="item in foodList"
        :key="item.food._id"
        :image="item.food.imageurl"
        :title="item.food.title"
        :people="item.food.numberserving"
        :price="item.food.price"
        :description="item.food.description"
        :userName="item.user_name"
        :rating="item.user_rating"
        :foodId="item.food._id"
        :consumerId="store.user ? store.user._id : 0"
            />
          </div>
        </div>
      </template>

      <script>
      import FoodCard from '../components/FoodCard.vue';
      import { inject, watch } from 'vue';

      export default {
        name: 'homepage',
        components: {
          FoodCard,
        },
        data() {
          return {
            foodList: [],
            loading: true,
            error: null,
          };
        },
        setup() {
          const store = inject('store');
    return { store };
  },
  methods: {
    async fetchFoodList() {
      try {
        const apiUrl = this.store.user
          ? `https://navobackend.onrender.com/api/showfood/${this.store.user._id}`
          : 'https://navobackend.onrender.com/api/showallfood';
        const response = await fetch(apiUrl, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        this.foodList = data;
      } catch (err) {
        console.error('Error fetching food items:', err);
        this.error = 'Error fetching food items';
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchFoodList();
  },
  watch: {
    'store.user': {
      handler() {
        this.fetchFoodList();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.text-primary {
  color: var(--color-primary);
}
.text-gray-500 {
  color: #6b7280;
}
.text-red-500 {
  color: #ef4444;
}
.font-questrial {
  font-family: 'Questrial', sans-serif;
}
</style>