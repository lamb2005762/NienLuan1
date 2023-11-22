<script>
export default {
    props: {
        carts: Array,
    },
    methods: {
        decreaseQuantity(index) {
            if (this.carts[index].quantity > 1) {
                this.carts[index].quantity--;
            }
        },

        increaseQuantity(index) {
            this.carts[index].quantity++;
        },

        deletedcart(index) {
            this.$emit("deleted:cartIndex", index);
        },

        formatPrice(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        },
    },

    computed: {
        totalPrice() {
            return this.carts.reduce((total, item) => total + item.price * item.quantity, 0);
        },
    },
};
</script>

<template>
    <div>
        
        <div v-if="carts.length === 0" class="text-center">
           <h3 class="text-center my-4">Giỏ Hàng của bạn đang trống</h3>
        </div>

        <div v-for="(item, index) in carts" :key="index">
            <div class="row mb-4 d-flex justify-content-between align-items-center">
                <div class="col-md-2 col-lg-2 col-xl-2">
                    <img :src="item.img" class="img-fluid rounded-3" alt="Product Image">
                </div>
                <div class="col-md-6 col-lg-6 col-xl-6">
                    <h6 class="text-muted">{{ item.title }}</h6>
                    <div class="center-container" style="margin: 5% 0;">
                        <div>
                            Số lượng
                        </div>
                        <div class="d-flex" style="margin-left: 10%;">
                            <button @click="decreaseQuantity(index)" class="btn btn-outline-dark">-</button>
                            <input id="quantity" name="quantity" type="text" v-model="item.quantity"
                                class="form-control form-control-sm"
                                style="width: 50px; text-align: center; border: 1px black solid;" />
                            <button @click="increaseQuantity(index)" class="btn btn-outline-dark">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h6 class="mb-0 price">{{ formatPrice(item.price * item.quantity) }}</h6>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                    <button type="button" @click="deletedcart(index)" class="text-muted btn btn-exit">
                        <i class="bi bi-x-square text-danger"></i>
                    </button>
                </div>
                <hr class="my-4">
            </div>
        </div>
    </div>
</template>

<style scoped>
.center-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>
  