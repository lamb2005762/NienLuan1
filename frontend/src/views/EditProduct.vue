<template>
    <HeaderAdmin></HeaderAdmin>
    <toastsVue></toastsVue>
    <div v-if="product" class="page">
        <h4 style="text-align: center; margin-top: 20px;">Cập nhật sản phẩm</h4>
        <Productform :product="product" @submit:product="updateProduct" />
    </div>
</template>

<script>
import toastjs from "../assets/js/toasts";
import toastsVue from "../components/toasts.vue";
import ProductService from "../services/Product.service";
import Productform from "../components/Productform.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";
export default {
    data() {
        return {
            toasts: {
                title: "Success",
                msg: "Cập nhật sản phẩm thành công",
                type: "success",
                duration: 2000
            },
            product: null,
        }
    },
    components: {
    Productform,
    toastsVue,
    HeaderAdmin
},
    methods: {
        toastjs,
        async getproduct(id) {
            try {
                this.product = await ProductService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: { pathMatch: this.$route.path.split("/").slice(1) },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.toastjs();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning",
                    this.toasts.msg = "Tài khoản không phải ADMIN",
                    this.toasts.type = "warn",
                    this.toasts.duration = 2000
                this.toastjs();
            }
        },
    },
    created() {
        this.getproduct(this.$route.params.id);
    },
};
</script>
