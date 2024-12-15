<script setup>
import homepage from './pages/homepage.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import AddFoodItem from './components/AddFoodItem.vue';
import Notifications from './components/Notifications.vue';
import MapView from './pages/MapView.vue';
import { ref, inject } from 'vue';

const store = inject('store');

const showLogin = ref(false);
const showRegister = ref(false);
const showAddFoodItem = ref(false);
const showMapView = ref(false);

function handleLogin(status) {
  showLogin.value = false;
}

function handleRegister() {
  showRegister.value = false;
}

function handleLogout() {
  store.clearUser();
}
</script>

<template>
  <div>
    <header class="bg-transparent text-primary p-6 z-8">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <span class="material-symbols-outlined text-4xl mr-2">restaurant</span>
          <h1 class="text-4xl font-dm-serif">Hunger.Point</h1>
          <span v-if="store.user" class="ml-4 text-xl font-questrial">Hi, {{ store.user.name }}</span>
        </div>
        <div class="flex items-center">
          <button v-if="store.user" class="text-primary hover:text-highlight font-questrial rounded-3xl px-4 py-2 mr-2 flex items-center" @click="showAddFoodItem = true">
            <span class="material-symbols-outlined mr-2">add</span>
            Add Food Item
          </button>
          <button v-if="!store.user" class="text-primary hover:text-highlight font-questrial rounded-3xl px-4 py-2 mr-2" @click="showLogin = true">Login</button>
          <button v-if="!store.user" class="text-primary hover:text-highlight font-questrial rounded-3xl px-4 py-2 mr-2" @click="showRegister = true">Register</button>
          <button v-if="store.user" class="text-primary hover:text-highlight font-questrial rounded-3xl px-4 py-2 mr-2" @click="showMapView = !showMapView">
            {{ showMapView ? 'Go to Food List' : 'Go to Map' }}
          </button>
          <button v-if="store.user" class="text-primary hover:text-highlight font-questrial rounded-3xl px-4 py-2 mr-2" @click="handleLogout">Logout</button>
          <Notifications v-if="store.user" />
        </div>
      </div>
    </header>
    <main>
      <homepage v-if="!showMapView" />
      <MapView v-else :foodList="foodList" />
    </main>
    <footer class="bg-transparent text-primary p-6 text-center">
      <div class="container mx-auto">
        <p>&copy; 2023 MyApp. All rights reserved.</p>
      </div>
    </footer>
    <Login v-if="showLogin" @close="showLogin = false" @login="handleLogin" />
    <Register v-if="showRegister" @close="showRegister = false" />
    <AddFoodItem v-if="showAddFoodItem" @close="showAddFoodItem = false" />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');

.font-dm-serif {
  font-family: 'DM Serif Text', serif;
}

.font-questrial {
  font-family: 'Questrial', sans-serif;
}
</style>