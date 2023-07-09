<template>
  <div class="profile-card">
    <div class="image-box">
      <img :src="profile.image" class="profil-image" />
      <div class="name-box">
        <p>{{ profile.name }}</p>
        <p>{{ profile.surname }}</p>
        <button v-if="!profile.isBlocked" class="blocked-button"  v-on:click.prevent="BlockedClick(profile.id)">
        <img src="../assets/images/blocked.png" alt="Add logo" class="image" />
      </button>
      <p v-if="profile.isBlocked" class="isBlocked">User is blocked</p>
      </div>
    </div>
    <div class="data-box">
      <div class="surround">
        <div class="items">
          <label>Username:</label>
          <p>{{ profile.username }}</p>
        </div>
        <div class="items">
          <label>Birthday:</label>
          <p>{{ profile.birthday }}</p>
        </div>
        <div class="items">
          <label>Gender:</label>
          <p>{{ profile.gender }}</p>
        </div>
        <div class="items" v-if="isBuyer">
          <label>Points:</label>
          <p>{{ profile.points }}</p>
        </div>
      </div>
      <div class="helping">
        <p class="box">{{ profile.role }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: ["profile", "BlockedClick"],
  data() {
    return {
      isBuyer: false
    };
  },

  mounted() {
    if (this.profile.role == "Buyer") {
      this.isBuyer = true;
    }
  }
};
</script>
<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  height: 20rem;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: rgba(122, 136, 220, 0.4);
}

.image-box {
  display: grid;
  height: 50%;
  grid-template-columns: 1fr 1fr;
  align-self: self-start;
  padding: 10px;
  gap: 20px;
}

.profil-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #f0f6f6;
  transition: transform 0.3s ease;
}

.profil-image:hover {
  transform: scale(1.1);
}
.name-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 21px;
  font-weight: bold;
  margin-top: 12px;
}

.box {
  font-weight: bold;
  color: #fff;
  display: inline-block;
  border-color: blue;
  border-style: double;
  background-color: lightblue;
  padding: 6px 12px;
  border-radius: 4px;
}

.items {
  display: flex;
  flex-direction: row;
  gap: 5px;
  font-size: 16px;
  color: rgb(58, 56, 56);
}

.data-box {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;
  padding: 15px 15px 0px 15px;
  margin-top: -35px;
}

.helping {
  align-self: center;
}
.blocked-button {
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  height: 35px;
  display: flex;
  width: 55px;
  text-align: center;
}
.blocked-button img{
  width: 55px;
  height: 35px;
}
.surround {
  align-items: baseline;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  gap: 5px;
}

.isBlocked{
  color: rgb(95, 108, 120);
  font-size: 15px;
}
</style>
