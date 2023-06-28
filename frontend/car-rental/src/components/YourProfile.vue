<template>
  <div >
    <navBar></navBar>
<div class="main-container">
  <div class="user-profile">
    <div class="profile-picture">
          <div class="profile-border">
            <div class="profile-picture">

      <img :src="user.image" alt="User Image">
      <label class="username">{{ user.username }}</label>
    </div>
    <div class="profile-details">
      <div class="detail">
        <label class="label">Name:</label>
        <label class="value">{{ user.name }}</label>
      </div>
      <div class="detail">
        <label class="label">Surname:</label>
        <label class="value">{{ user.surname }}</label>
      </div>
      <div class="detail">
        <label class="label">Gender:</label>
        <label class="value">{{ user.gender }}</label>
      </div>
      <div class="detail">
        <label class="label">Birthday:</label>
        <label class="value">{{ user.birthday }}</label>
      </div>
    </div>
    </div>
    </div>
  </div>
</div>
</div>

</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";

export default {
  components: {
    navBar: Navbar
  },
  data() {
    return {
      user: {
        username: null,
        name: null,
        surname: null,
        gender: null,
        birthday: null,
        image: null
      },
      userId: null
    };
  },

  mounted() {
    this.userId = this.$route.params.id;

    axios.get(`http://localhost:8081/users/${this.userId}`).then(response => {
      console.log(response);
      this.user = response.data;
    });
  }
};
</script>

<style>


.main-container {
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  background-position: center;
  height: 100vh; /* Updated */
  display: flex;
  justify-content: center;
  padding: 60px;
}
.user-profile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 55%;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background-image: url(../assets/images/display.jpg);
  background-size: cover;


}

.profile-border {
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(48, 71, 203, 0.6);


}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.profile-picture img:hover {
  transform: scale(1.1);

}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: rgba(174, 212, 246, 0.4);

  border-radius: 5px;
  text-align: center;
}

.profile-details:hover {
  transform: scale(1.1);
  background-color: rgba(182, 189, 228, 1);

}

.detail {
  display: flex;
  margin-bottom: 10px;
}

.label {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.value {
  font-size: 18px;
  color: #555;
}

.username {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  color: #333;
}

/* Additional Styles */
.label {
  text-transform: uppercase;
}

.detail:last-child {
  margin-bottom: 0;
}

/* Media Query for Smaller Screens */
@media (max-width: 576px) {
  .user-profile {
    padding: 20px;
  }

  .profile-picture img {
    width: 120px;
    height: 120px;
  }

  .username {
    font-size: 20px;
  }

  .label,
  .value {
    font-size: 16px;
  }
}


</style>
