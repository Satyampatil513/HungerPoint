<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-3xl shadow-lg w-80">
      <h2 class="text-2xl font-dm-serif mb-4 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="phone">Phone Number</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="text" id="phone" v-model="phone" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="password">Password</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="password" id="password" v-model="password" required />
        </div>
        <div class="flex justify-between items-center">
          <button class="bg-highlight text-background font-questrial rounded-3xl px-4 py-2" type="submit">Login</button>
          <button class="text-primary hover:text-highlight font-questrial rounded-3xl" type="button" @click="$emit('close')">Cancel</button>
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
      phone: '',
      password: '',
    };
  },
  setup() {
    const store = inject('store');
    return { store };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch(`https://navobackend.onrender.com/api/login/${this.phone}/${this.password}`, {
          method: 'GET',
        });
        const data = await response.json();
        if (data._id) {
          this.store.setUser(data);
          this.$emit('login', true);
          this.$emit('close'); // Close the login component
        } else {
          alert('Wrong phone number or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed');
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