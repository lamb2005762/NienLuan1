<script>
import CartService from '../services/Cart.service';
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toast from '../assets/js/toasts';
export default {
  data() {
    return {
      carts: [],
      toasts: {
        title: "Warning",
        msg: "Bạn chưa đăng nhập",
        type: "warn",
        duration: 3000
      },
    }
  },
  computed: {
    ...mapState(useAuthStore, {
      currentUser: "user",
    }),
    getlengthcarts() {
      return this.carts.length;
    },
  },
  methods: {
    toast,
    ...mapActions(useAuthStore, ["logout", "loadAuthState"]),
    slideSearch: function () {
      this.$el.querySelector("#input_search").classList.toggle("input_search");
      this.$el.querySelector("#input_search").focus();
    },
    async showcarts() {
      try {
        this.showuser();
        if (this.currentUser != null) {
          this.carts = await CartService.get(this.currentUser._id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    showuser() {
      if (this.currentUser == null) {
        document.querySelector('.login').style.display = "none";
        document.querySelector('.not-login').style.display = "block";
      } else {
        document.querySelector('.login').style.display = "block";
        document.querySelector('.not-login').style.display = "none";
        document.querySelector('.data_user').innerHTML = this.currentUser.username;
      }
    },
    handlelogout() {
      this.logout();
      this.$router.push({ name: "login" });
    },
    gotocart() {
      if (!this.currentUser) {
        this.toast();
      } else {
        this.$router.push({ name: "CartShop" });
      }
    },
    gotonew() {
      if (!this.currentUser) {
        this.toast();
      } else {
        this.$router.push({ name: "sachmoi" });
      }
    },
    gotobest() {
      if (!this.currentUser) {
        this.toast();
      } else {
        this.$router.push({ name: "banchay" });
      }
    },
    gotoforeign() {
      if (!this.currentUser) {
        this.toast();
      } else {
        this.$router.push({ name: "foreign" });
      }
    }
  },
  created() {
    this.loadAuthState();
  },
  mounted() {
    this.showcarts();
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="../img/logo1.png" alt="Yame.vn" style="width: 66px;">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page">
              Trang Chủ
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Hàng đầu
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li class="dropdown-item" @click="gotonew">
                Sách mới
              </li>
              <li class="dropdown-item" @click="gotobest">
                Sách bán chạy
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Văn học
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#vanhoc">Văn học Việt Nam</a></li>
              <li class="dropdown-item" @click="gotoforeign">
                Văn học nước ngoài
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Xã hội
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#lichsu">Lịch sử</a></li>
              <li><a class="dropdown-item" href="#triethoc">Triết học</a></li>
              <li><a class="dropdown-item" href="#tamly">Tâm lý học</a></li>
              <li><a class="dropdown-item" href="#kinhte">Kinh tế</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Tự nhiên
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#toan">Toán học</a></li>
              <li><a class="dropdown-item" href="#ly">Vật lý</a></li>
              <li><a class="dropdown-item" href="#hoa">Hóa học</a></li>
              <li><a class="dropdown-item" href="#sinh">Sinh học</a></li>
              <li><a class="dropdown-item" href="#thienvan">Thiên văn học</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex flex-mb">
          <input class="form-control me-2 hiden" id="input_search" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-light" type="button" @click="slideSearch()"><i class="bi bi-search icon"></i></button>
        </form>

        <!-- HTML -->
        <div class="Cart" @click="gotocart">
          <i class="bi bi-bag-fill icon icon_cart"></i>
          <span class="quantity_cart">{{ getlengthcarts }}</span>
        </div>


        <div class="User">
          <div class="not-login">
            <i class="bi bi-person-circle icon" data-bs-toggle="collapse" href="#user"></i>
            <div class="collapse user_link" id="user">
              <div class="card card-body bg-light connect-shop">
                <router-link to="/login" class="text-dark">Đăng nhập</router-link>
                <router-link to="/logup" class="text-dark">Đăng ký</router-link>
              </div>
            </div>
          </div>
          <div class="login">
            <span class="text-dark data_user" data-bs-toggle="collapse" href="#user"></span>
            <div class="collapse user_link" id="user">
              <div class="card card-body bg-light connect-shop">
                <router-link to="/profile" class="text-dark">Trang cá nhân</router-link>
                <a to="/" class="text-dark" @click="handlelogout()">Đăng xuất</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.connect-shop {
  padding: 0;
}

.connect-shop a:hover {
  background-color: rgb(122, 122, 122, 0.8);
}

.connect-shop a {
  padding: 10px 10px;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;
}

.User,
.Cart {
  margin-left: 20px;
  position: relative;
  display: flex;
  align-items: center;
}

.quantity_cart {
  position: absolute;
  top: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  line-height: 20px;
  color: #fff;
  font-size: 16px;
  background: red;
  right: -10px;
  text-align: center;
}

#cart_link::-webkit-scrollbar {
  width: 6px;
  background-color: #F5F5F5;
}

.hiden {
  visibility: hidden;
}


.user_link {
  width: 150px;
  text-align: end;
  position: absolute;
  top: 97%;
  right: 10px;
  z-index: 10;
}

.user_link a {
  display: block;
  text-decoration: none;
}

@keyframes Search {
  0% {
    transform: translateX(5%);
  }

  100% {
    transform: translateX(0%);
  }
}

@media only screen and (max-width:1024px) {

  .User,
  .Cart {
    display: none;
  }

  @keyframes Search {
    0% {
      transform: translateX(5%);
    }

    100% {
      transform: translateX(0%);
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0.5;
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
</style>