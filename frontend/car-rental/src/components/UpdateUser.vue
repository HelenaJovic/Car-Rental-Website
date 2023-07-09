<template>
  <div>
    <navBar></navBar>
    <div class="main-container">
      <div class="register-form">
        <div class="flex-item">
          <h2>Your profile</h2>
          <div v-if="IsBuyer">
            <p v-if="form.buyerType.name === 'Gold'">🥇</p>
            <p v-if="form.buyerType.name === 'Silver'">🥈</p>
            <p v-if="form.buyerType.name === 'Bronze'">🥉</p>
          </div>
        </div>
        <form>
          <div class="form-group">
            <div class="image-manager">
              <img :src="form.image" class="order-logo" />
            </div>
            <label for="username">Username</label>
            <input type="text" id="username" v-model="form.username" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" />
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="form.name" />
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input type="text" id="surname" v-model="form.surname" />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <select id="gender" v-model="form.gender">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="birthday">Birthday</label>
            <input type="date" id="birthday" v-model="form.birthday" />
          </div>
          <div class="form-group">
            <button type="button" v-on:click="submitForm()">Update</button>
          </div>
        </form>
      </div>
      <div class="displayOrder " v-if="IsBuyer && orders.length > 0">
        <div class="order-header">
          <div class="search-box">
            <input
              type="text"
              v-model="search"
              class="search-input"
              placeholder="Name,Price1 - Price2,Date1 - Date2"
            /><label>🔍</label>
          </div>
          <div class="title-container">
            <h2>Your orders</h2>
          </div>
          <div class="filter-box">
            <label for="sort-by">Sort By:</label>
            <select
              v-model="selectedSortField"
              id="sort-by"
              class="custom-select"
            >
              <option value="">Select</option>
              <option value="name">Name</option>
              <option value="cheapest">Cheapest</option>
              <option value="mostExpensive">Most Expensive</option>

              <option value="date">Date</option>
            </select>
          </div>
        </div>
        <ul class="order-list">
          <li
            v-for="order in filterObjects"
            :key="order.orderId"
            class="order-orderd"
          >
            <div class="order-orderd-container">
              <div class="order-container">
                <h2 class="name">{{ order.name }}</h2>
                <img :src="order.logo" class="order-logo" alt="Logo" />

                <p class="labels2">Date 📅: {{ order.date }}</p>

                <p class="labels2">Duration ⌛: {{ order.duration }}</p>
                <p class="labels2">Final Price 💸: {{ order.price }}</p>
                <p
                  :class="[
                    'orderStatus',
                    order.orderStatus.toLowerCase() === 'approved'
                      ? 'approved'
                      : order.orderStatus.toLowerCase() === 'picked-up'
                      ? 'picked-up'
                      : order.orderStatus.toLowerCase() === 'returned'
                      ? 'returned'
                      : order.orderStatus.toLowerCase() === 'rejected'
                      ? 'rejected'
                      : order.orderStatus.toLowerCase() === 'canceled'
                      ? 'canceled'
                      : 'in-progress'
                  ]"
                >
                  Status:
                  {{
                    order.orderStatus.toLowerCase() === "approved"
                      ? "Approved"
                      : order.orderStatus.toLowerCase() === "picked-up"
                      ? "Picked Up"
                      : order.orderStatus.toLowerCase() === "returned"
                      ? "Returned"
                      : order.orderStatus.toLowerCase() === "rejected"
                      ? "Rejected"
                      : order.orderStatus.toLowerCase() === "canceled"
                      ? "Canceled"
                      : "InProgress"
                  }}
                </p>
              </div>

              <div class="vehicle-vehicle">
                <div class="status-container">
                  <button
                    class="button-container"
                    v-if="isInProcessing(order)"
                    @click="cancelOrder(order)"
                  >
                    Cancel order
                  </button>
                </div>
                <div class="vehicle-container">
                  <div class="vehicle-scroll">
                    <OrderCard
                      v-for="vehicle in order.vehicles"
                      :key="vehicle.id"
                      :vehicle="vehicle"
                    ></OrderCard>
                  </div>
                </div>
                <form
                  v-if="order.orderStatus === 'Returned' && isAlreadyCommented"
                  class="comment-form"
                >
                  <label for="comment">Leave a comment:</label>
                  <textarea id="comment" v-model="comment.text"></textarea>

                  <label for="rating">Rating:</label>
                  <input
                    type="number"
                    id="rating"
                    v-model="comment.grade"
                    min="1"
                    max="5"
                    class="input"
                  />

                  <button v-on:click.prevent="submitComment(order.rentalId)">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="reccommend" v-if="orders.length === 0 && IsBuyer">
        <p class="noCommentss" readonly>
          "Thank you for becoming our customer. We see that you haven't made any
          orders yet. We still recommend that the best choice is with us. You
          can check all the options we have and the vehicle lists within each
          rental car object."
        </p>
        <router-link :to="'/'">
          <h2 class="nameS">👉 See all rentals</h2>
        </router-link>
        <div class="forIMG">
          <img
            src="../assets/images/lena.png"
            alt="Recommendation"
            class="imageRR"
          />
        </div>
      </div>
      <div class="displayOrder " v-if="IsManager">
        <div class="order-header" v-if="orders.length > 0">
          <div class="search-box">
            <input
              type="text"
              v-model="search"
              class="search-input"
              placeholder="Price1 - Price2,Date1 - Date2"
            /><label>🔍</label>
          </div>
          <div class="title-container">
            <router-link :to="'/singleObject/' + rentalId">
              <h2 class="changeName">{{ name }}</h2>
            </router-link>
          </div>
          <div class="filter-box">
            <label for="sort-by">Sort By:</label>
            <select
              v-model="selectedSortField"
              id="sort-by"
              class="custom-select"
            >
              <option value="">Select</option>
              <option value="cheapest">Cheapest</option>
              <option value="mostExpensive">Most Expensive</option>

              <option value="date">Date</option>
            </select>
          </div>
        </div>
        <ul class="order-list">
          <li
            v-for="order in filterObjects"
            :key="order.orderId"
            class="order-orderd"
          >
            <div class="order-orderd-container">
              <div class="order-container">
                <router-link :to="'/display/' + order.idUser">
                  <h2 class="name">{{ order.userName }} {{ order.surname }}</h2>
                </router-link>

                <img :src="order.logo" class="order-logo" alt="Logo" />

                <p class="labels2">Date 📅: {{ order.date }}</p>

                <p class="labels2">Duration ⌛: {{ order.duration }}</p>
                <p class="labels2">Final Price 💸: {{ order.price }}</p>
                <p
                  :class="[
                    'orderStatus',
                    order.orderStatus.toLowerCase() === 'approved'
                      ? 'approved'
                      : order.orderStatus.toLowerCase() === 'received'
                      ? 'received'
                      : order.orderStatus.toLowerCase() === 'returned'
                      ? 'returned'
                      : order.orderStatus.toLowerCase() === 'rejected'
                      ? 'rejected'
                      : order.orderStatus.toLowerCase() === 'canceled'
                      ? 'canceled'
                      : 'in-progress'
                  ]"
                >
                  Status:
                  {{
                    order.orderStatus.toLowerCase() === "approved"
                      ? "Approved"
                      : order.orderStatus.toLowerCase() === "received"
                      ? "Received"
                      : order.orderStatus.toLowerCase() === "returned"
                      ? "Returned"
                      : order.orderStatus.toLowerCase() === "rejected"
                      ? "Rejected"
                      : order.orderStatus.toLowerCase() === "canceled"
                      ? "Canceled"
                      : "InProgress"
                  }}
                </p>
              </div>
              <div class="vehicle-vehicle">
                <div class="status-container">
                  <button
                    class="button-container"
                    v-if="isInProcessing(order)"
                    @click="approveOrder(order)"
                  >
                    Approve✅
                  </button>
                  <button
                    class="button-container"
                    v-if="isInProcessing(order)"
                    @click="showRejectionPopup(order)"
                  >
                    Reject❎
                  </button>
                  <button
                    class="button-container"
                    v-if="checkVisibility(order)"
                    @click="takeOrder(order)"
                  >
                    Make order as taken
                  </button>

                  <button
                    class="button-container"
                    v-if="isReceived(order)"
                    @click="returnOrder(order)"
                  >
                    Return order
                  </button>

                  <div v-if="showPopup === true">
                    <h3>Enter reason for rejection:</h3>
                    <textarea v-model="rejectionReason"></textarea>
                    <button @click="rejectOrder(order)">
                      Confirm
                    </button>
                  </div>
                </div>
                <div class="vehicle-container">
                  <div class="vehicle-scroll">
                    <OrderCard
                      v-for="vehicle in order.vehicles"
                      :key="vehicle.id"
                      :vehicle="vehicle"
                    ></OrderCard>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <div class="displayOrder1" v-if="comments.length > 0">
            <div class="comment-header">
              <h2>Comments</h2>
            </div>
            <div class="comment-list-container">
              <ul class="comment-list">
                <li
                  v-for="comment in comments"
                  :key="comment.commentId"
                  class="comment-container"
                >
                  <div class="list-part">
                    <div class="user-info">
                      <img
                        :src="comment.logo"
                        alt="User Logo"
                        class="user-logo"
                      />
                      <span>{{ comment.userName }} {{ comment.surname }}</span>
                    </div>
                    <p class="comment-txt">{{ comment.text }}</p>
                    <p class="button1" v-if="parseInt(comment.grade) === 1">
                      ⭐
                    </p>
                    <p class="button1" v-if="parseInt(comment.grade) === 2">
                      ⭐⭐
                    </p>
                    <p class="button1" v-if="parseInt(comment.grade) === 3">
                      ⭐⭐⭐
                    </p>
                    <p class="button1" v-if="parseInt(comment.grade) === 4">
                      ⭐⭐⭐⭐
                    </p>
                    <p class="button1" v-if="parseInt(comment.grade) === 5">
                      ⭐⭐⭐⭐⭐
                    </p>

                    <div class="buttons" v-if="!comment.isSeen">
                      <button
                        class="button1"
                        v-on:click.prevent="approveComment(comment)"
                      >
                        ✔️
                      </button>
                      <button
                        class="button1"
                        v-on:click.prevent="rejectComment(comment)"
                      >
                        ❌
                      </button>
                    </div>
                    <p
                      v-if="comment.isSeen"
                      v-bind:class="{
                        approved: comment.isApproved,
                        rejected: !comment.isApproved
                      }"
                    >
                      {{ comment.isApproved ? "Approved" : "Rejected" }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <p class="noComments" v-if="orders.length === 0">
            "There are still no orders for your rental."
          </p>
        </ul>
      </div>

      <div class="admin-box" v-if="isAdministrator">
        <div class="header-box">
          <div class="h2-container">
            <h2>All registered users</h2>
          </div>
          <button
            class="suspicious-container"
            v-on:click.prevent="handleSuspiciousClick"
          >
            <p>Suspicious</p>
            <img
              src="../assets/images/suspicious.png"
              alt="Add logo"
              class="image"
            />
          </button>
        </div>
        <div class="second-container">
          <div class="search-container">
            <input
              type="text"
              v-model="search"
              class="search-input"
              placeholder="Name, Surname, Username"
            />
            <p>🔍</p>
          </div>
          <div class="filter-container">
            <button
              v-if="!showFilter"
              type="submit"
              v-on:click.prevent="toggleFilter()"
            >
              Filter
            </button>
            <transition name="slide">
              <div class="filter-slide" v-if="showFilter">
                <div>
                  <label for="role-type-filter">Role:</label>
                  <select v-model="roleTypeFilter" id="role-type-filter">
                    <option value="">All</option>
                    <option v-for="type in roleTypes" :value="type">{{
                      type
                    }}</option>
                  </select>
                </div>
                <div>
                  <label for="user-type-filter">User Type:</label>
                  <select v-model="userTypeFilter" id="user-type-filter">
                    <option value="">All</option>
                    <option v-for="type in userTypes" :value="type">{{
                      type
                    }}</option>
                  </select>
                </div>
              </div>
            </transition>
          </div>

          <div class="combobox-container">
            <label for="sort-by">Sort By:</label>
            <select
              v-model="selectedSortField"
              id="sort-by"
              class="custom-select"
            >
              <option value="">Select</option>
              <option value="name-up">Name 🔼 </option>
              <option value="name-down">Name🔽 </option>
              <option value="surname-up">Surname🔼 </option>
              <option value="surname-down">Surname🔽 </option>
              <option value="username-up">Username 🔼 </option>
              <option value="username-down">Username🔽 </option>
              <option value="points-up">Points 🔼 </option>
              <option value="points-down">Points🔽 </option>
            </select>
          </div>
        </div>

        <div class="profile-items">
          <ProfileCard
            v-for="profile in filteredProfiles"
            :key="profile.id"
            :profile="profile"
            :blocked-click="BlockedClick"
          ></ProfileCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
import Navbar from "./Navbar.vue";
import OrderCard from "./OrderCard.vue";
import ProfileCard from "./ProfileCard.vue";

export default {
  props: ["order"],

  components: {
    navBar: Navbar,
    OrderCard: OrderCard,
    ProfileCard: ProfileCard
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        name: "",
        surname: "",
        gender: "",
        birthday: "",
        image: ""
      },
      UserId: 0,
      showFilter: false,
      roleTypeFilter: "",
      userTypeFilter: "",
      roleTypes: ["Buyer", "Manager", "Administrator"],
      userTypes: ["Gold", "Silver", "Bronze"],
      orders: [],
      profiles: [],
      search: "",
      comments: [],
      selectedSortField: "",
      IsBuyer: false,
      IsManager: false,
      isAdministrator: false,
      name: "",
      rentalId: 0,
      comment: {
        idUser: "",
        idRental: "",
        text: "",
        grade: 0,
        isSeen: false,
        isApproved: false
      },
      isAlreadyCommented: false,
      showPopup: false,
      rejectionReason: ""
    };
  },

  methods: {
    BlockedClick(UserId) {
      axios
        .put(`http://localhost:8081/users/isBlockedUser/user/${UserId}`)
        .then(response => {
          this.$toastr.s("Bravo!");
          this.$forceUpdate();
        })
        .catch(error => {
          console.error(error);
          console.log(error);
          this.$toastr.e("Error heere!");
        });
    },
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    filterByRoleAndType(profiles) {
      const filteredByRole = this.roleTypeFilter
        ? profiles.filter(profile => profile.role === this.roleTypeFilter)
        : profiles;

      const filteredByType = this.userTypeFilter
        ? filteredByRole.filter(
            profile =>
              profile.buyerType &&
              profile.buyerType.name === this.userTypeFilter
          )
        : filteredByRole;

      return filteredByType;
    },
    matchPriceRange: function(price, searchValue) {
      const priceRangeRegex = /\d+\s*-\s*\d+/;
      const searchRegex = new RegExp(searchValue, "i");

      if (priceRangeRegex.test(searchValue)) {
        const [minPrice, maxPrice] = searchValue
          .split("-")
          .map(value => value.trim());
        return (
          Number(price) >= Number(minPrice) && Number(price) <= Number(maxPrice)
        );
      }

      return price.toString().match(searchRegex);
    },

    matchDateRange: function(date, searchValue) {
      const dateRangeRegex = /\d{4}-\d{2}-\d{2}\s*-\s*\d{4}-\d{2}-\d{2}/;
      const searchRegex = new RegExp(searchValue, "i");

      if (dateRangeRegex.test(searchValue)) {
        const [startDate, endDate] = searchValue
          .split(" - ")
          .map(value => value.trim());
        const currentDate = new Date(date);
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        return currentDate >= startDateObj && currentDate <= endDateObj;
      }

      return searchRegex.test(date);
    },

    showRejectionPopup(order) {
      this.showPopup = true;
    },

    approveOrder(order) {
      axios
        .put(`http://localhost:8081/orders/approveOrder/${order.orderId}`)
        .then(response => {
          this.$toastr.s("Order approved!");
          this.$forceUpdate();

          this.orders = this.orders.map(item => {
            if (item.orderId === order.orderId) {
              item.orderStatus = "Approved";
            }
            return item;
          });
        })
        .catch(error => {
          this.$toastr.e("Error!");
        });
    },

    rejectOrder(order) {
      axios
        .put(`http://localhost:8081/orders/rejectOrder/${order.orderId}`, {
          reason: this.rejectionReason
        })
        .then(response => {
          this.$toastr.s("Order rejected!");
          this.orders = this.orders.map(item => {
            if (item.orderId === order.orderId) {
              item.orderStatus = "Rejected";
            }
            return item;
          });
        })
        .catch(error => {
          this.$toastr.e("Error!");
        });

      this.showPopup = false;
      this.rejectionReason = "";
    },
    submitForm() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .put(`http://localhost:8081/users/${decoded.id}`, this.form)
        .then(response => {
          this.$toastr.s("Successfully updated!");
          this.$forceUpdate();
        })
        .catch(error => {
          this.$toastr.e("This username already exists!");
        });
    },
    getUserData() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      axios
        .get(`http://localhost:8081/users/${decoded.id}`)
        .then(response => {
          this.form = response.data;
        })

        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching user data");
        });
    },

    sortProfile(profiles, field) {
      let sortOrder = "asc";

      if (field.includes("-up")) {
        field = field.replace("-up", "");
      } else if (field.includes("-down")) {
        field = field.replace("-down", "");
        sortOrder = "desc";
      }

      profiles.sort((profile1, profile2) => {
        const value1 = profile1[field];
        const value2 = profile2[field];

        let comparison = 0;

        if (value1 < value2) {
          comparison = -1;
        } else if (value1 > value2) {
          comparison = 1;
        }

        if (sortOrder === "desc") {
          comparison *= -1;
        }

        return comparison;
      });
    },

    checkIfBuyer() {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      if (decoded.role == "Buyer") {
        this.IsBuyer = true;
      } else if (decoded.role == "Manager") {
        this.IsManager = true;
      } else if (decoded.role == "Administrator") {
        this.isAdministrator = true;
      }
    },
    submitComment(rentalId) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);
      this.comment.idUser = decoded.id;
      this.comment.idRental = rentalId;
      if (!this.comment.grade || !this.comment.text) {
        this.$toastr.e(
          "Please fill in all required fields and enter valid values."
        );
        return;
      }
      axios
        .post(`http://localhost:8081/comments`, this.comment)
        .then(() => {
          this.$toastr.s("Comment successfully added!");
        })
        .catch(err => {
          console.log(err);
          this.$toastr.e("Error adding vehicle!");
        });
    },
    approveComment(comment) {
      comment.isApproved = true;
      comment.isSeen = true;
      axios
        .put("http://localhost:8081/comments/update", {
          commentId: comment.commentId,
          isApproved: true,
          isSeen: true
        })
        .then(response => {
          this.$toastr.s("Successfully updated!");
          this.$forceUpdate();
        })
        .catch(error => {
          this.$toastr.e("Eroor in updating!");
        });
    },
    rejectComment(comment) {
      comment.isApproved = false;
      comment.isSeen = true;
      axios
        .put(`http://localhost:8081/comments/update`, {
          commentId: comment.commentId,
          isApproved: false,
          isSeen: true
        })
        .then(response => {
          this.$toastr.s("Successfully updated!");
          this.$forceUpdate();
        })
        .catch(error => {
          this.$toastr.e("Eroor in updating!");
        });
    },
    isInProcessing(order) {
      if (order.orderStatus === "InProgress") {
        return true;
      }
    },

    isReceived(order) {
      if (order.orderStatus === "Received") {
        return true;
      }
    },

    checkVisibility(order) {
      const today = new Date();
      const startDate = new Date(order.date);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + order.duration);

      const formattedEndDate = endDate.toISOString().split("T")[0];
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedToday = today.toISOString().split("T")[0];

      if (
        order.orderStatus === "Approved" &&
        formattedStartDate < formattedToday &&
        formattedToday < formattedEndDate
      ) {
        return true;
      }

      return false;
    },

    cancelOrder(order) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      axios
        .put(`http://localhost:8081/orders/cancelOrder/${order.orderId}`)
        .then(response => {
          this.$toastr.s("Order canceled!");
          this.$forceUpdate();

          axios
            .put(`http://localhost:8081/users/increaseCounter/${decoded.id}`)
            .then(response => {
              this.$toastr.s("Bravo!");
              this.$forceUpdate();
            })
            .catch(error => {
              console.error(error);
              this.$toastr.e("Error!");
            });

          this.orders = this.orders.map(item => {
            if (item.orderId === order.orderId) {
              item.orderStatus = "Canceled";
            }
            return item;
          });
        })
        .catch(error => {
          this.$toastr.e("Error!");
        });

      axios
        .post(`http://localhost:8081/users/lostPoints/${decoded.id}`, {
          points: order.price
        })
        .then(response => {
          this.$toastr.s("You have lost points!");
        })
        .catch(error => {
          this.$toastr.e("Error!");
        });
    },

    takeOrder(order) {
      axios
        .put(`http://localhost:8081/orders/takeOrder/${order.orderId}`)
        .then(response => {
          this.$toastr.s("Order taken!");
          this.$forceUpdate();

          this.orders = this.orders.map(item => {
            if (item.orderId === order.orderId) {
              item.orderStatus = "Received";
            }
            return item;
          });
        })
        .catch(error => {
          this.$toastr.e("Error");
        });
    },

    returnOrder(order) {
      axios
        .put(`http://localhost:8081/orders/returnOrder/${order.orderId}`)
        .then(response => {
          this.$toastr.s("Order returned!");
          this.$forceUpdate();

          this.orders = this.orders.map(item => {
            if (item.orderId === order.orderId) {
              item.orderStatus = "Returned";
            }
            return item;
          });
        })
        .catch(error => {
          this.$toastr.e("Error");
        });
    }
  },
  mounted() {
    this.getUserData();
    this.checkIfBuyer();

    const token = localStorage.getItem("token");
    const decoded = jwt_decode(token);

    if (!this.isAdministrator) {
      axios
        .get(`http://localhost:8081/orders/${decoded.id}`)
        .then(response => {
          this.orders = response.data;
          this.orders.forEach(order => {
            const rentalId = order.rentalId;
            this.name = order.name;
            console.log(order.name);
            this.rentalId = order.rentalId;
            axios
              .get(
                `http://localhost:8081/comments/${this.rentalId}/${decoded.id}`
              )
              .then(response => {
                this.isAlreadyCommented = response.data.isCommented;
                console.log(this.isAlreadyCommented);
              })
              .catch(error => {
                console.error(error);
                window.alert("An error occurred while fetching orders data");
              });

            axios
              .get(`http://localhost:8081/comments/Allcomments/${rentalId}`)
              .then(response => {
                this.comments = response.data;
                console.log(this.comments);
              })
              .catch(error => {
                console.error(error);
                window.alert("An error occurred while fetching orders data");
              });
          });
        })
        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching orders data");
        });
    }

    if (!this.isAdministrator && this.orders > 0) {
      axios
        .get(`http://localhost:8081/orders/${decoded.id}`)
        .then(response => {
          if (response != null) {
            console.log(response);
            this.orders = response.data;
            this.name = this.orders[0].name;
            this.rentalId = this.orders[0].rentalId;
          }
        })
        .catch(error => {
          console.error(error);
          window.alert("An error occurred while fetching orders data");
        });
    }
    if (this.isAdministrator) {
      axios
        .get(`http://localhost:8081/users/usersForAdmin/${decoded.id}`)
        .then(response => {
          this.profiles = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  computed: {
    filterObjects: function() {
      const searchValues = this.search.split(",").map(value => value.trim());

      const filteredOrders = this.orders.filter(order => {
        let matchesSearch = true;

        for (const searchValue of searchValues) {
          if (searchValue) {
            const searchRegex = new RegExp(searchValue, "i");

            const matchesName = order.name.match(searchRegex);
            const matchesDate = this.matchDateRange(order.date, searchValue);
            const matchesPrice = this.matchPriceRange(order.price, searchValue);

            matchesSearch =
              matchesSearch && (matchesName || matchesDate || matchesPrice);
          }
        }

        return matchesSearch;
      });

      if (this.selectedSortField) {
        this.sortByField(filteredOrders, this.selectedSortField);
      }

      return filteredOrders;
    },

    filteredProfiles() {
      const searchValues = this.search.split(",").map(value => value.trim());

      let filteredProfiles = this.profiles.filter(profile => {
        let matchesSearch = true;

        for (const searchValue of searchValues) {
          if (searchValue) {
            const searchRegex = new RegExp(searchValue, "i");

            const matchesName = profile.name.match(searchRegex);
            const matchesSurname = profile.surname.match(searchRegex);
            const matchesUsername = profile.username.match(searchRegex);

            matchesSearch =
              matchesSearch &&
              (matchesName || matchesSurname || matchesUsername);
          }
        }

        return matchesSearch;
      });

      filteredProfiles = this.filterByRoleAndType(filteredProfiles);

      if (this.selectedSortField) {
        this.sortProfile(filteredProfiles, this.selectedSortField);
      }

      return filteredProfiles;
    },
    handleSuspiciousClick() {
      this.profiles = this.profiles.filter(
        profile => parseInt(profile.counter) > 4
      );
      console.log(this);
    }
  }
};
</script>

<style scoped>
.main-container {
  background-image: url(../assets/images/auto.jpg);
  background-size: cover;
  display: flex;

  gap: 1em;
  flex-direction: row;
  background-position: center;
  padding: 40px;
}

.admin-box {
  flex-grow: 3;
  width: 75%;

  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-box {
  height: 8%;

  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(37, 37, 37, 0.1);
  background-color: rgba(199, 224, 224, 0.5);
}

.profile-items {
  display: flex;
  flex-direction: row;
  gap: 25px;
  flex-wrap: wrap;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(37, 37, 37, 0.1);
  background-color: rgba(199, 224, 224, 0.5);
  padding: 20px;
  border-radius: 1%;
  overflow-y: auto;
  max-height: 650px;
}

.second-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(37, 37, 37, 0.1);
  background-color: rgba(199, 224, 224, 0.5);
}

.search-container {
  display: flex;
  align-items: center;
  width: 32%;
  padding: 0px 0px 5px 10px;
  padding: 5px;
}
.search-container p {
  font-size: 1.7rem;
  margin-left: 0.7rem;
}

.search-input {
  flex: 1;
  width: 250px;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.combobox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0px 20px 5px 0px;
}

.combobox-container label {
  margin-right: 0.5rem;
  font-size: 1.3rem;
}

.comment-container {
  margin-bottom: 10px;
  flex: 1;
}

.comment-container button {
  margin-top: 10px;
}

.register-form {
  height: min-content;
  flex-grow: 1;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-image: url(../assets/images/back3.jpg);
  background-size: cover;
  background-position: center;
  width: 25%;
  margin: 0 auto;

  border: 1px solid #ccc;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
}

.register-form h2 {
  text-align: center;
  font-size: 35px;
  color: rgb(140, 168, 239);
}

.displayOrder {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 3;

  width: 75%;
  gap: 5rem;
  padding: 10px;
}

.displayOrder1 {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-grow: 3;

  width: 100%;
  gap: 5rem;
  padding: 10px;
}

.register-form .form-group {
  margin-bottom: 20px;
}

.register-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.register-form input[type="text"],
.register-form input[type="password"],
.register-form select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.register-form button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  background-image: url(../assets/images/back111.jpg);
  background-size: cover;
  background-position: center;
  color: #fff;
  border: none;
}

.register-form button:hover {
  background-color: #45a049;
  cursor: pointer;
}

.name:hover {
  color: darkblue;
}
.filter-container button {
  background-color: rgb(192, 171, 171);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;

  height: 40px;
  width: 100px;
}

.nameS:hover {
  color: darkblue;
}

.filter-slide {
  display: flex;
  gap: 1rem;
}
.nameS {
  font-size: 50px;
  text-align: center;
  color: lightslategray;
}
.changeName:hover {
  color: darkblue;
  font-size: 40px;
}

.order-list {
  list-style: none;
  display: flex;
  max-width: 100%;
  padding: 5px;
  flex-direction: column;
  gap: 10px;
}

.order-orderd {
  gap: 20rem;
  flex-wrap: wrap;
  background-image: url(../assets/images/back2.jpg);
  background-size: cover;
  background-position: center;
  padding: 20px;

  border-radius: 5px;
  max-height: 550px;
}

.order-orderd-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

.order-container {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid #ccc; /* Dodat border sa bojom #ccc */
  border-radius: 5px; /* Dodat border-radius za blago zaobljen izgled */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* Dodat box-shadow efekat */
  padding: 10px; /* Dodat padding za unutrašnji prostor */
  background-color: rgba(
    26,
    101,
    141,
    0.1
  ); /* Promenjen kod za postavljanje transparentnosti */
}

.noCommentss {
  font-size: 30px;
  align-items: center;
  text-align: center;
  color: #ad3421;
}
.order-container:hover {
  transform: scale(1.1);
  background-color: rgba(
    142,
    194,
    220,
    0.8
  ); /* Promenjen kod za postavljanje transparentnosti */
}

.flex-item {
  display: flex;
  justify-content: center;
}
.flex-item p {
  font-size: 30px;
}
.vehicle-vehicle {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.status-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  padding: 5px 0px 10px 0px;
}

.button-container {
  padding: 0.5rem 1rem;
  background-color: lightslategray;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 18px;
}
.vehicle-container {
  flex-grow: 1;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  box-shadow: none;
  transition: transform 0.3s ease;
  cursor: pointer;
  justify-items: center;
  background-color: rgba(144, 15, 15, 0);
}

.vehicle-scroll {
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 250px; /* Adjust the max height as desired */
  max-width: 1000px;

  flex-direction: column;
  justify-content: center; /* Center items horizontally */
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 8%;
  background-image: url(../assets/images/back8.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.noComments {
  font-size: 40px;
  align-items: center;
  text-align: center;
  color: #ad3421;
}

.search-box {
  display: flex;
  align-items: center;
}

.search-input {
  width: 230px;
  padding: 5px;
  border: none;
  border-radius: 3px;
}

.search-input:focus {
  outline: none;
}

.search-box label {
  margin-left: 5px;
}

.title-container {
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 25px;
  color: rgb(198, 226, 244); /* Crvena boja - možete promeniti u željenu boju */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Efekat senke na naslov */
}
.comment-list-container {
  height: 300px; /* Postavite visinu prema potrebama */
  overflow-y: auto;
}
.forIMG {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0rem;
  width: 100%;
  justify-items: flex-end;
}

.imageRR {
  height: 530px;
  width: 450px;
  align-self: flex-start; /* Postavite sliku na kraj diva */
  margin-top: auto; /* Dodajte razmak na vrhu da bi slika bila na dnu */
}

.comment-list {
  display: flex;
  flex-direction: column;
  padding: 25px;
  margin-top: 20px;
  gap: 1rem;
  background-color: transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.reccommend {
  display: flex;
  padding: 20px;
  width: 70%;
  flex-direction: column;
  justify-items: center;
  gap: 1rem;
}

.comment-list::-webkit-scrollbar {
  width: 10px; /* Širina scrollbar-a */
}

.comment-list::-webkit-scrollbar-track {
  background: #f1f1f1; /* Boja pozadine track-a */
}

.comment-list::-webkit-scrollbar-thumb {
  background: #888; /* Boja thumb-a */
}

.comment-list::-webkit-scrollbar-thumb:hover {
  background: #555; /* Boja thumb-a prilikom hover-a */
}

.approved {
  background-color: green;
  color: white;
  border-radius: 5px;
  width: 10%;
  margin-top: 10px;
  text-align: center;
}

.rejected {
  background-color: red;
  width: 10%;
  text-align: center;
  color: white;
  margin-top: 10px;
  border-radius: 5px;
}

.list-part {
  background-image: url(../assets/images/back3.jpg);
  background-size: cover;
  background-position: center;
  padding: 10px;
  border-radius: 10px; /* Dodajte zaobljene ivice */
}

.comment-header {
  display: flex;
  background-image: url(../assets/images/back10.jpg);
  background-size: cover;
  background-position: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px; /* Dodajte zaobljene ivice */
}
.comment-header h2 {
  margin: 0;
  color: rgb(241, 245, 247);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.filter-box {
  display: flex;
  align-items: center;
  color: whitesmoke;
}

.filter-box label {
  margin-right: 5px;
}

.custom-select {
  padding: 5px;
  border-radius: 3px;
}
.comment-form {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: rgba(199, 224, 224, 0.5);
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-form textarea {
  width: 100%;
  height: 6rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.comment-form button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #45a049;
}

.comment-form p {
  margin-bottom: 0.5rem;
}
.input {
  margin-right: 20px;
}

.labels2 {
  font-size: 15px;
  color: rgb(12, 75, 79);
  padding: 6px;
  margin-left: 8px;
  align-items: flex-end;
  font-family: "Lato", Arial, sans-serif;
  text-align: center;
}

.order-logo {
  width: 45%;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  filter: brightness(90%) contrast(110%);
  align-self: center;
  border: 2px solid #fff; /* Debljina i boja bordera */
}
.order-logo:hover {
  transform: scale(1.1);
}

.buttons {
  display: flex;
  gap: 1rem;
  height: 40px;
}

.button1 {
  font-size: 20px;
}

p.orderStatus {
  font-weight: bold;
  font-size: 15px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 40px;
  padding: 3px;
  border-radius: 20px; /* Promenjeno na 20px */
  text-align: center;
}

p.orderStatus.approved {
  background-color: #28a745;
}

p.orderStatus.canceled {
  background-color: rgb(232, 96, 96);
}
.header-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  background-color: rgba(82, 82, 221, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  font-size: 22px;
  color: rgb(183, 230, 230);
}

.h2-container {
  width: 80%;
  padding: 0px 0px 0px 80px;
  justify-content: center;
  text-align: center;
}

.suspicious-container {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.2rem;
}

.suspicious-container p {
  font-size: 15px;
  color: #ad3421;
}

.suspicious-container img {
  width: 20%;
}

p.orderStatus {
  background-color: rgb(15, 132, 182);
}

.name {
  font-size: 25px;
  color: rgb(15, 132, 182);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  letter-spacing: 1px;
  transition: color 0.3s ease;
  align-self: center;
  text-align: center;
}

.image-manager {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.comment-txt {
  font-size: 20px;
}

.user-logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info span {
  font-weight: bold;
  font-size: 25px;
}
</style>
