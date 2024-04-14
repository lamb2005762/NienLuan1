<script>
import SliderShop from '@/components/SliderShop.vue';
import HeaderShop from '@/components/HeaderShop.vue';
import ProductService from '../services/Product.service';
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toastsVue from '../components/toasts.vue';
export default {
    data() {
        return {
            Products: [],
        }
    },
    components: {
        HeaderShop,
        SliderShop,
        toastsVue
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
        newProducts() {
            return this.Products.filter(item => item.categories === 'New').slice(0, 6);
        },
        bestProducts() {
            return this.Products.filter(item => item.categories === 'Best').slice(0, 6);
        },
        foreignProducts() {
            return this.Products.filter(item => item.categories === 'English').slice(0, 6);
        },
    },
    methods: {
        async retrieveProduct() {
            try {
                this.Products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        formatPrice(price) {
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
            return formattedPrice;
        },
    },
    mounted() {
        this.retrieveProduct();
    },
}
</script>
<template>
    <div class="header">
        <HeaderShop></HeaderShop>
    </div>
    <toastsVue></toastsVue>
    <div class="slider">
        <SliderShop></SliderShop>
    </div>
    <div style="text-align: center; margin: 30px 0;" class="heading">
        <h1>Sách mới</h1>
    </div>
    <div class="flex-row">
        <div class="product-container" id="vnnn">
            <div class="col-4 product" v-for="(item, index) in newProducts" :key="index">
                <div class="card m-1" style="width: 18rem; height: 100%;">
                    <div>
                        <img :src="item.img" alt="Product Image" class="d-block">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <h6>{{ formatPrice(item.price) }}</h6>
                        <router-link :to="{ name: 'details', params: { id: item._id } }">
                            <button type="button" class="btn btn-outline-dark">Mua hàng</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div>
        <h3 style="text-align: center;">
            <router-link to="/sachmoi" class="nav-link">
                Xem thêm
            </router-link>
        </h3>
    </div>

    <div style="text-align: center; margin: 30px 0;" class="heading">
        <h1>Sách bán chạy</h1>
    </div>
    <div class="flex-row">
        <div class="product-container" id="bc">
            <div class="col-4 product" v-for="(item, index) in bestProducts" :key="index">
                <div class="card m-1" style="width: 18rem; height: 100%;">
                    <div>
                        <img :src="item.img" alt="Product Image" class="d-block">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <h6>{{ formatPrice(item.price) }}</h6>
                        <router-link :to="{ name: 'details', params: { id: item._id } }">
                            <button type="button" class="btn btn-outline-dark">Mua hàng</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h3 style="text-align: center;">
        <router-link to="/banchay" class="nav-link">
            Xem thêm
        </router-link>
    </h3>
    <div style="text-align: center; margin: 30px 0;" class="heading">
        <h1>Sách tiếng anh</h1>
    </div>
    <div class="flex-row">
        <div class="product-container" id="vnnn">
            <div class="col-4 product" v-for="(item, index) in foreignProducts" :key="index">
                <div class="card m-1" style="width: 18rem; height: 100%;">
                    <div>
                        <img :src="item.img" alt="Product Image" class="d-block">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <h6>{{ formatPrice(item.price) }}</h6>
                        <router-link :to="{ name: 'details', params: { id: item._id } }">
                            <button type="button" class="btn btn-outline-dark">Mua hàng</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <h3 style="text-align: center;">
        <router-link to="/foreign" class="nav-link">
            Xem thêm
        </router-link>
    </h3>
</template>

<style scoped>
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
    /* Đảm bảo 3 card trên mỗi hàng */
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.product img {
    display: block;
    width: 100%;
    /* Đảm bảo ảnh chiếm toàn bộ phần tử cha */
    height: 300px;
    /* Đặt chiều cao cố định cho ảnh */
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
</style>
