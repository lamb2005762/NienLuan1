<script>
import HeaderShop from '@/components/HeaderShop.vue';
import toastsVue from '../components/toasts.vue';
import ProductService from '../services/Product.service';
export default {
    data() {
        return {
            Products: [],
        }
    },
    components: {
        HeaderShop,
        toastsVue
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
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>
    <div style="text-align: center; margin: 30px 0;" class="heading">
        <h1>Tất cả sách bán chạy</h1>
    </div>
    <div class="flex-row">
        <div class="product-container" id="vnnn">
            <div class="col-4 product" v-for="item in Products" v-show="item.categories === 'Bán chạy'">
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
</style>