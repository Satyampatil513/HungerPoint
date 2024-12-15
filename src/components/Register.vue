<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-3xl shadow-lg w-80">
      <h2 class="text-2xl font-dm-serif mb-4 text-center">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="name">Name</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="text" id="name" v-model="name" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="email">Email</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="email" id="email" v-model="email" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="phone">Phone Number</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="text" id="phone" v-model="phone" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="password">Password</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="password" id="password" v-model="password" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="confirmPassword">Confirm Password</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-questrial mb-2" for="address">Address</label>
          <input class="w-full p-2 border border-black rounded-3xl" type="text" id="address" v-model="address" required />
        </div>
        <div class="mb-4">
          <button type="button" @click="locateMe" :disabled="locationSaved" class="bg-highlight text-background font-questrial rounded-3xl px-4 py-2">
            {{ locationSaved ? 'Location Saved' : 'Locate Me' }}
          </button>
        </div>
        <div class="flex justify-between items-center">
          <button class="bg-highlight text-background font-questrial rounded-3xl px-4 py-2" type="submit">Register</button>
          <button class="text-primary hover:text-highlight font-questrial rounded-3xl" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      address: '',
      latitude: null,
      longitude: null,
      locationSaved: false,
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await fetch('https://navobackend.onrender.com/api/addnewuser', {
          method: 'POST',
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            address: this.address,
            latitude: this.latitude,
            longitude: this.longitude,
            rating: 0.0,
          }),
          
        });
        
        const data = await response.json();
        console.log(data);
        if (data) {
          alert('Registration successful');
          this.$emit('close');
        } else {
          alert('Registration failed: ' + data.message);
        }
      } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed');
      }
    },
    locateMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.locationSaved = true;
            alert(`Location found: Latitude ${this.latitude}, Longitude ${this.longitude}`);
          },
          error => {
            console.error('Error getting location:', error);
            alert('Failed to get location');
          }
        );
      } else {
        alert('Geolocation is not supported by this browser');
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