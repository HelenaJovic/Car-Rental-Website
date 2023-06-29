<template>
  <div class="profile-card">
    <div class="image-box">
      <img :src="profile.image" class="profil-image" />
      <div class="name-box">
        <p>{{ profile.name }}</p>
        <p>{{ profile.surname }}</p>
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
  props: ["profile"]
};
</script>
<style scoped>
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30%;
  height: 17rem;

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
  background-color: rgb(88, 81, 81);
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
  padding: 0px 15px 0px 15px;
  margin-top: -25px;
}

.helping {
  align-self: center;
}

.surround {
  align-items: baseline;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
</style>
