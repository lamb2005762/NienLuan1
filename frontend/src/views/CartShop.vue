<script>
import HeaderShop from '@/components/HeaderShop.vue';
import CartService from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js';
import CartItem from '../components/CartItem.vue';
export default {
  data() {
    return {
      carts: [],
      toasts: {
        title: "",
        msg: "",
        type: "",
        duration: 0
      },
    }
  },
  components: {
    HeaderShop,
    toastsVue,
    CartItem,
  },
  methods: {
    getiduser() {
      const user = JSON.parse(localStorage.getItem("user"));
      return user._id;
    },
    async getcarts() {
      try {
        this.carts = await CartService.get(this.getiduser());
      } catch (error) {
        console.log(error);
      }
    },
    async delcart(index) {
      this.toasts.title = "Deleted",
        this.toasts.msg = "Đã xóa sản phẩm",
        this.toasts.type = "error",
        this.toasts.duration = 2000
      this.toastsjs();
      await CartService.delete(this.carts[index]._id)
      this.refeshlistcart();
    },
    toastsjs,
    refeshlistcart() {
      this.getcarts();
    },
    registerproduct() {
      if (this.carts.length > 0) {
        this.toasts.title = "Success",
          this.toasts.msg = "Đã thành toán",
          this.toasts.type = "success",
          this.toasts.duration = 2000,
          this.toastsjs();
      } else {
        this.toasts.title = "Failed",
          this.toasts.msg = "Bạn chưa có sản phẩm",
          this.toasts.type = "error",
          this.toasts.duration = 2000,
          this.toastsjs();
      }
    },
    total() {
      var total = 0;
      for (var i in this.carts) {
        total += (this.carts[i].price * this.carts[i].quantity);
      }
      var formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });

      return formatter.format(total);
    },
  },
  created() {
    this.refeshlistcart();
  },
}
</script>
<template>
  <HeaderShop></HeaderShop>
  <toastsVue></toastsVue>
  <section class="h-100 h-custom" style="background-color: rgb(234,232,232);">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px;">
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black">Giỏ hàng</h1>
                      <h6 class="mb-0 text-muted">{{ carts.length }} sản phẩm</h6>
                    </div>
                    <hr class="my-4">
                    <CartItem :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Đơn hàng</h3>
                    <hr class="my-4">

                    <div class="mb-4 pb-2">
                      <label for="fullName" class="form-label">Họ và tên</label>
                      <input type="text" id="fullName" class="form-control" required>
                    </div>

                    <div class="mb-4 pb-2">
                      <label for="phoneNumber" class="form-label">Số điện thoại</label>
                      <input type="tel" id="phoneNumber" class="form-control" required>
                    </div>

                    <div class="mb-4 pb-2">
                      <label for="address" class="form-label">Địa chỉ giao hàng</label>
                      <textarea id="address" class="form-control" required></textarea>
                    </div>
                    <div v-if="carts.length > 0" class="text-end">
                      <h4>Tổng cộng: {{ total() }}</h4>
                      <button type="button" class="btn btn-success" @click="registerproduct()">Đặt hàng</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
@media (min-width: 1025px) {
  .h-custom {
    height: 100%;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: .75em;
  padding-right: .75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #eae8e8;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 992px) {
  .card-registration-2 .bg-grey {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

@media (max-width: 991px) {
  .card-registration-2 .bg-grey {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
</style>