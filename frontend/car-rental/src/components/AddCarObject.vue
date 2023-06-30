<template>
  <div>
    <navBar></navBar>
    <div class="main-container">
      <div class="first-item">
        <label class="labels">Name:</label>
        <input type="text" v-model="form.name" class="input" />

        <label class="labels">Location:</label>
        <input type="text" v-model="form.location.adress" class="input" />

        <label class="labels">Working time:</label>
        <input type="text" v-model="form.workHours" class="input" />

        <label for="image" class="labels">Logo URL:</label>
        <div class="image-input-container">
          <input type="text" id="txt" v-model="form.imagePath" required />

          <input
            type="file"
            id="image"
            @change="handleImageUpload"
            style="display: none"
            ref="fileInput"
          />
          <button
            type="button"
            v-on:click.prevent="UploadImage()"
            v-on:click="CreateObject()"
            class="buttonForImg"
          >
            ...
          </button>
        </div>

        <input
          type="submit"
          value="Add rent-a-car object"
          class="button-style"
          v-on:click.prevent="AddObject()"
        />
      </div>

      <div class="second-item-1" v-if="isThereAnyManagers">
        <label class="labels">Select manager for car-rental object:</label>
        <select
          v-model="selectedManager"
          class="input1"
          @change="handleOptionChange"
          :disabled="!isObjectAdded"
        >
          <option
            v-for="option in managers"
            :value="option.id"
            :key="option.id"
          >
            {{ option.name }}
          </option>
        </select>
        <p>❗CheckBox will be blocked as long as you add the object</p>
      </div>

      <div class="second-item-2" v-if="!isThereAnyManagers">
        <p>
          ❗ There are no available managers, so you should register new one
        </p>
        <label for="username" class="labels">Username:</label>
        <input
          type="text"
          id="username"
          v-model="form1.username"
          class="neki"
        />

        <label for="password" class="labels">Password:</label>
        <input
          type="password"
          id="password"
          v-model="form1.password"
          class="neki"
        />

        <label for="new_password" class="labels">Confirm password:</label>
        <input
          type="password"
          id="new_password"
          v-model="form1.new_password"
          class="neki"
        />

        <label class="labels">Name:</label>
        <input type="text" v-model="form1.name" class="neki" />

        <label for="surname" class="labels">Surname:</label>
        <input type="text" id="surname" v-model="form1.surname" class="neki" />

        <label for="gender" class="labels">Gender:</label>
        <select id="gender" v-model="form1.gender" class="neki">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label for="birthday" class="labels">Birthday:</label>
        <input
          type="date"
          id="birthday"
          v-model="form1.birthday"
          class="neki"
        />

        <button
          type="submit"
          v-on:click.prevent="submitForm()"
          :disabled="!isObjectAdded"
        >
          Register
        </button>
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
      form: {
        name: "",
        workHours: "",
        vehicles: [],
        location: {
          adress: ""
        },
        status: false,
        grade: null,
        imagePath: ""
      },
      selectedManager: null,
      managers: [],
      objectId: null,
      isObjectAdded: false,
      isThereAnyManagers: false,

      form1: {
        username: "",
        password: "",
        new_password: "",
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        basket: null,
        role: "Manager",
        pastRentals: null,
        rentalObject: null,
        points: null,
        buyerType: null
      }
    };
  },
  methods: {
    UploadImage() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.imagePath = `/static/${file.name}`;
      }
    },

    AddObject() {
      axios.post("http://localhost:8081/cars", this.form).then(response => {
        this.$toastr.s("Successfully added car object!");

        this.objectId = response.data.id;
        this.form1.rentalObject = response.data.id;
        this.isObjectAdded = true;
        console.log(this.isObjectAdded);
      });
    },

    GetAvailableManagers() {
      axios.get("http://localhost:8081/users/managers").then(response => {
        this.managers = response.data;
        if (this.managers.length > 0) {
          this.isThereAnyManagers = true;
        }
      });
    },

    handleOptionChange() {
      axios
        .put(
          `http://localhost:8081/users/${this.selectedManager}/${this.objectId}`
        )
        .then(response => {
          this.$toastr.s("Successfully added manager!");
          this.$router.push("/");
          this.$forceUpdate();
        });
    },

    submitForm() {
      if (this.form1.password !== this.form1.new_password) {
        this.$toastr.e("Passwords do not match!");
        return;
      }
      axios
        .post("http://localhost:8081/users", this.form1)
        .then(response => {
          this.$toastr.s("Successfully registered manager!");
          this.$router.push("/");
        })
        .catch(err => {
          this.$toastr.e("This username already exists!");
        });
    }
  },

  mounted() {
    this.GetAvailableManagers();
  }
};
</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: stretch;
  background-image: url("../assets/images/auto.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.first-item {
  grid-column: 1/2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 74px 0px 40px 40px;
}

.input {
  width: 400px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

p {
  color: rgb(82, 78, 78);
}

.input1 {
  width: 400px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
}

.neki {
  width: 400px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.image-input-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.image-input-container input[type="text"] {
  width: 330px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttonForImg {
  background-color: gray;
  border-radius: 5px;
  width: 50px;
}

.labels {
  font-size: 20px;
}

.button-style {
  background-color: black;
  color: white;
  font-size: 16px;
  width: 200px;
  height: 35px;
  position: absolute;
  left: 10%;
  top: 87%;
  border-radius: 5px;
}

.button-style:hover {
  background-color: #45a049;
  cursor: pointer;
}

.second-item-1 {
  grid-column: 2/3;
  display: flex;
  flex-direction: column;

  gap: 10px;
  padding: 70px 40px 40px 0px;
}
.second-item-2 {
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px 40px 40px 0px;
}

.second-item-2 button {
  width: 200px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-color: black;
  color: #fff;
  border: none;
  margin-top: 30px;
  margin-left: 80px;
}
</style>
