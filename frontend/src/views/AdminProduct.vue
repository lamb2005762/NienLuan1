<script>
import HeaderAdmin from "../components/HeaderAdmin.vue";
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import toast from "../assets/js/toasts";
export default {
    data() {
        return {
            products: [],
            toasts: {
                title: "Success",
                msg: "Đã xóa sản phẩm!",
                type: "success",
                duration: 3000
            },
        }
    },
    components: {
        HeaderAdmin,
        toastsVue,
    },
    methods: {
        toast,
        async getall() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
                this.toast();
                setTimeout(() => {
                    this.$router.push({ name: "ShopMain" });
                }, 1000);
            }
        },
        async deleteProduct(productId) {
            try {
                await ProductService.delete(productId);
                this.products = this.products.filter(product => product._id !== productId);
                this.toast();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning",
                    this.toasts.msg = "Không xóa được, vui lòng thử lại sau!",
                    this.toasts.type = "warn",
                    this.toasts.duration = 2000
                this.toastjs();
            }
        },
        formatPrice(price) {
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
            return formattedPrice;
        },
    },
    created() {
        this.getall();
    },
}
</script>
<template>
    <div>
        <HeaderAdmin></HeaderAdmin>
        <toastsVue></toastsVue>
        <div class="main_admin d-flex" style="margin-top: 30px; margin-left: 100px;">
            <div class="list_products">
                <div style="margin-bottom: 5%;">
                    <h4>Danh Sách Sản Phẩm</h4>
                    <router-link to="/addproduct">
                        <button class="btn btn-primary" style="margin: 10px;">Thêm Sản phẩm</button>
                    </router-link>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Tùy chỉnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, index) in products" :key="product._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ product.title }}</td>
                            <td>
                                <img :src="product.img" alt="Product Image" style="max-width: 50px; max-height: 50px;">
                            </td>
                            <td>{{ product.categories }}</td>
                            <td>{{ formatPrice(product.price) }}</td>
                            <td>
                                <router-link :to="{ name: 'editproduct', params: { id: product._id } }">
                                    <span class="badge bg-warning text-dark">
                                        <i class="bi bi-pencil-square"></i>
                                    </span>
                                </router-link>
                                <span @click="deleteProduct(product._id)" class="badge bg-danger text-dark"
                                    style="margin-left: 10%;">
                                    <i class="bi bi-trash"></i>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>