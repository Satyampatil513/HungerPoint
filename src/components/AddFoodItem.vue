<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-3xl shadow-lg w-80">
      <h2 class="text-2xl font-dm-serif mb-4 text-center">Add Food Item</h2>
      <form @submit.prevent="handleAddFoodItem">
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="title">Title</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="text" id="title" v-model="title" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="description">Description</label>
          <textarea class="w-full p-2 border border-black rounded-3xl" id="description" v-model="description" required></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="servings">Servings</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="number" id="servings" v-model="servings" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="price">Price</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="number" id="price" v-model="price" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="image">Image</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="file" id="image" @change="handleImageUpload" required />
        </div>
        <div class="flex justify-between items-center">
          <button class="bg-highlight text-background font-questrial rounded-3xl px-4 py-2" type="submit">Add Food Item</button>
          <button class="text-primary hover:text-highlight font-questrial rounded-3xl" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  data() {
    return {
      title: '',
      description: '',
      servings: 0,
      price: 0,
      image: '',
    };
  },
  setup() {
    const store = inject('store');
    return { store };
  },
  methods: {
    handleImageUpload(event) {
      this.image = event.target.files[0];
    },
    async handleAddFoodItem() {
      
      const body = {
        imageurl: "https://www.example.com/food-image.jpg",
        title: this.title,
        description: this.description,
        numberserving: this.servings,
        price: this.price,
        userid: this.store.user._id,
      };

      try {
        const response = await fetch('https://navobackend.onrender.com/api/addnewfood', {
          method: 'POST',
          body: JSON.stringify(body),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        alert('Food item added successfully');
        this.$emit('close');
      } catch (error) {
        console.error('Error adding food item:', error);
        alert('Failed to add food item');
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Questrial&display=swap');

.font-dm-serif {
  font-family: 'DM Serif Text', serif;
}

.font-questrial {
  font-family: 'Questrial', sans-serif;
}
.bg-white {
  background-color: var(--color-background);
}
.text-primary {
  color: var(--color-primary);
}
.text-secondary {
  color: var(--color-secondary);
}
.text-highlight {
  color: var(--color-highlight);
}
.bg-highlight {
  background-color: var(--color-highlight);
}
.bg-primary {
  background-color: var(--color-primary);
}
.text-background {
  color: var(--color-background);
}
</style>