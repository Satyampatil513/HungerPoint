<template>
  <div :class="['bg-white shadow rounded-3xl overflow-hidden border border-black p-4 transition-all duration-300 ease-in-out', { 'col-span-2': expanded }]">
    <div class="aspect-ratio-container">
      <img :src="image" @error="setDefaultImage" alt="Food Image" class="w-full h-full object-cover rounded-3xl" />
    </div>
    <div class="content">
      <h2 class="text-xl text-primary font-semibold mb-2">{{ title }}</h2>
      <p class="text-sm text-secondary mb-2">Serves: {{ people }} people</p>
      <p class="text-lg font-bold text-highlight">₹{{ price }}</p>
      <button @click="toggleExpand" class="mt-4 bg-highlight text-background py-2 px-4 rounded-3xl hover:bg-primary transition-colors">
        {{ expanded ? 'Show Less' : 'Show More' }}
      </button>
    </div>
    <div v-if="expanded" class="expanded-content mt-4">
      <p class="text-sm text-secondary mb-2">Description: {{ description }}</p>
      <p class="text-sm text-secondary mb-2">User: {{ userName }}</p>
      <p class="text-sm text-secondary mb-2">Rating: {{ '★'.repeat(rating) }}</p>
      <div class="mb-4">
        <label class="block text-sm font-questrial mb-2" for="servings">Number of Servings</label>
        <input class="w-full p-2 border border-black rounded-3xl" type="number" id="servings" v-model="selectedServings" min="1" :max="people" />
      </div>
      <button @click="buyFood" :disabled="consumerId === 0" class="mt-2 bg-primary text-background py-2 px-4 rounded-3xl hover:bg-highlight transition-colors">
        Buy Now
      </button>
    </div>
  </div>
</template>

<script>
import placeholderImage from '../assets/placeholder.jpg';

export default {
  name: 'FoodCard',
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    foodId: {
      type: String,
      required: true,
    },
    consumerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
      selectedServings: 1,
      placeholderImage, // Use the imported placeholder image
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    setDefaultImage(event) {
      event.target.src = this.placeholderImage;
    },
    async buyFood() {
      try {
        const response = await fetch(`https://navobackend.onrender.com/api/bookfood/${this.foodId}/${this.selectedServings}/${this.consumerId}`, {
          method: 'GET',
        });
        const result = await response.text();
        alert(result);
      } catch (error) {
        console.error('Error buying food:', error);
        alert('Failed to buy food');
      }
    },
  },
};
</script>

<style scoped>
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
.aspect-ratio-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 aspect ratio */
}
.aspect-ratio-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>