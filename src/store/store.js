import { reactive, watch } from 'vue';

const storedUser = JSON.parse(localStorage.getItem('user'));

export const store = reactive({
  user: storedUser || null,
  setUser(userData) {
    this.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  },
  clearUser() {
    this.user = null;
    localStorage.removeItem('user');
  },
});

// Watch for changes in the user state and update local storage
watch(
  () => store.user,
  (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  }
);