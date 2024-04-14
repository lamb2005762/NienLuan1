<script>
import HeaderShop from '@/components/HeaderShop.vue'
import ProductService from '../services/Product.service'
import CartService from '../services/Cart.service'
import toastsVue from '../components/toasts.vue'
import toastsjs from '../assets/js/toasts.js'
import { mapState } from 'pinia'
import { useAuthStore } from "@/stores/Auth.store";
export default {
    data() {
        return {
            detailproduct: [],
            Products: [],
            cartitem: {
                userId: '',
                productId: this.$route.params.id,
                quantity: 1,
                title: "",
                img: "",
                price: "",
            },
            carts: [],
            toasts: {
                title: "Success",
                msg: "Thêm vào giỏ hàng thành công",
                type: "success",
                duration: 2000
            },
            sub_quantity: 1,
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    components: {
        HeaderShop,
        toastsVue
    },
    methods: {
        toastsjs,
        // mới
        async retrieveProduct() {
            try {
                this.Products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async getproduct() {
            try {
                this.detailproduct = await ProductService.get(this.$route.params.id);
                this.cartitem.title = this.detailproduct.title;
                this.cartitem.img = this.detailproduct.img[0];
                this.cartitem.price = this.detailproduct.price;
            } catch (error) {
                console.log(error);
            }
        },
        async getidcart() {
            this.cartitem.quantity = this.sub_quantity;
            var exitcart = false;

            try {
                this.carts = await CartService.get(this.currentUser._id);
                this.cartitem.userId = this.currentUser._id;
                this.carts.map((cartproduct) => {
                    if (cartproduct.productId == this.cartitem.productId) {
                        this.cartitem.quantity += cartproduct.quantity;
                        CartService.update(cartproduct._id, this.cartitem);
                        exitcart = true;
                        this.toastsjs();
                        setTimeout(() => {
                            this.$router.push({ name: 'CartShop' });
                        }, 1000);
                    }
                })
                if (exitcart === false) {
                    this.cartitem.userId = this.currentUser._id;
                    CartService.create(this.cartitem);
                    this.toastsjs();
                    setTimeout(() => {
                        this.$router.push({ name: 'CartShop' });
                    }, 1000);
                }
            } catch (error) {
                this.toasts.title = "Message",
                    this.toasts.msg = "Bạn chưa đăng nhập!",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000,
                    this.toastsjs();
                console.log(error);
            }
        },
        formatPrice(price) {
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
            return formattedPrice;
        },

        decreaseQuantity: function () {
            if (this.sub_quantity > 1) {
                this.sub_quantity--;
            }
        },
        increaseQuantity: function () {
            this.sub_quantity++;
        }
    },
    mounted() {
        this.retrieveProduct();
    },
    created() {
        this.getproduct();
    },

}
</script>
<template>
    <div>
        <HeaderShop></HeaderShop>
        <toastsVue></toastsVue>
        <div class="heading">
            <div class="title bg-light">
                <h2 class="text-dark" style="padding-left: 20px;">{{ detailproduct.title }}</h2>
            </div>
        </div>
        <div class="wrapper">
            <div class="row">
                <!-- <div class="col-md-4">
                    <img :src="detailproduct.img" alt="Product Image" class="img-fluid">
                </div> -->
                <div class="img_product col">
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item" v-for="(img, index) in detailproduct.img"
                                :class="{ active: index == 0 }">
                                <img :src="img" class="d-block w-100" alt="..." style="border-radius: 8px ;">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="info_product">
                        <div class="center-container">
                            <div style="margin-right: 25%;">Giá</div>
                            <span class="price text-danger">{{ formatPrice(detailproduct.price) }}</span>
                        </div>
                        <div class="center-container" style="margin: 5% 0;">
                            <div>
                                Số lượng
                            </div>
                            <div class="d-flex" style="margin-left: 10%;">
                                <button @click="decreaseQuantity" class="btn btn-outline-dark">-</button>
                                <input id="quantity" name="quantity" type="text" v-model="sub_quantity"
                                    class="form-control form-control-sm"
                                    style="width: 50px; text-align: center; border: 1px black solid;" />
                                <button @click="increaseQuantity" class="btn btn-outline-dark">+</button>
                            </div>
                        </div>
                        <div class="btn_product" style="margin-top: 10px;">
                            <button type="submit" class="btn btn-danger" style="width:50%;" @click="getidcart()">Thêmvào
                                giỏ hàng</button>
                            <router-link to="/">
                                <button type="button" class="btn btn-danger" style="width:100px;">Trở về</button>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="describe_product d-flex flex-column align-items-center text-justify">
                        <h4>Mô tả sản phẩm</h4>
                        <p class="text-justify">{{ detailproduct.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Có thể bạn cũng thích -->
        <div style="text-align: center; margin: 30px 0;" class="heading">
            <h1>Có thể bạn cũng thích</h1>
        </div>
        <div class="flex-row">
            <div class="product-container" id="vnnn">
                <div class="col-4 product" v-for="(item, index) in Products" :key="item.id">
                    <template v-if="index < 6">
                        <div class="card m-1" style="width: 18rem; height: 100%;">
                            <!-- <div>
                                <img :src="item.img" alt="Product Image" class="d-block">
                            </div> -->
                            <div class="wrapper-img">
                                <div class="image_slider">
                                    <div class="image_item" v-for="img in item.img">
                                        <img :src="item.img" alt="Product Image" class="d-block">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{ item.title }}</h5>
                                <h6>{{ formatPrice(item.price) }}</h6>
                                <router-link :to="{ name: 'details', params: { id: item._id } }">
                                    <button type="button" class="btn btn-outline-dark">Mua hàng</button>
                                </router-link>
                            </div>
                        </div>
                    </template>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn_product {
    display: flex;
    justify-content: space-around;
}

.center-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.text-justify {
    text-align: justify;
}

.describe_product {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.wrapper {
    margin: 50px 100px;
}

.heading {
    margin: 0 100px;
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100px;
}

.flex-row {
    display: flex;
    justify-content: center;
    margin: 0 100px;
}

.product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: stretch;
}

.product {
    width: calc(33.33% - 20px);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.product img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
}

.card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card {
    height: 100%;
}

.card-title {
    flex-grow: 1;
}

.wrapper-img {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>