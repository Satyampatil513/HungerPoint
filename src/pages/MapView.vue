<template>
    <div id="map" class="h-full w-full"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import { inject } from 'vue';
  
  export default {
    name: 'MapView',
    data() {
      return {
        foodList: [],
      };
    },
    setup() {
    const store = inject('store');
    return { store };
  },
    mounted() {
      this.fetchFoodList();
    },
    methods: {
      async fetchFoodList() {
        try {
          const response = await fetch(`https://navobackend.onrender.com/api/showfood/${this.store.user._id}`);
          const data = await response.json();
          this.foodList = data;
          console.log(this.foodList);
          this.initMap();
        } catch (error) {
          console.error('Error fetching food items:', error);
        }
      },
      initMap() {
        const map = L.map('map').setView([51.505, -0.09], 13);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  
        // Custom icons
        const userIcon = L.divIcon({
          html: '<span class="material-symbols-outlined" style="color: #ff6d1f; font-size: 48px;">home_pin</span>',
          className: 'custom-icon',
          iconSize: [48, 48],
        });
  
        const foodIcon = L.divIcon({
          html: '<span class="material-symbols-outlined" style="color: #ff6d1f; font-size: 48px;">person_pin_circle</span>',
          className: 'custom-icon',
          iconSize: [48, 48],
        });
        const userLocation = [this.store.user.latitude, this.store.user.longitude];
        L.marker(userLocation, { icon: userIcon }).addTo(map).bindPopup('You are here').openPopup();
        map.setView(userLocation, 13);
        
  
        // Add food items locations
        this.foodList.forEach(food => {
          const foodLocation = [food.user_latitude, food.user_longitude];
          L.marker(foodLocation, { icon: foodIcon }).addTo(map).bindPopup(`
            <b>Food:</b> ${food.food.title}<br>
            <b>User Name:</b> ${food.user_name}<br>
            <b>User Address:</b> ${food.user_address}<br>
            <b>User Rating:</b> ${food.user_rating}<br>
          `);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    height: 100vh;
    width: 100%;
  }
  
  .custom-icon {
    font-size: 48px;
  }
  </style>