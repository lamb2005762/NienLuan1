<script>
import HeaderAdmin from "../components/HeaderAdmin.vue";
import UserService from "../services/User.service";
import toastsVue from "../components/toasts.vue";
import Usercard from "../components/Usercard.vue";
import toast from "../assets/js/toasts";

export default {
    data() {
        return {
            users: [],
            toasts: {
                title: "Success",
                msg: "Đã xóa người dùng!",
                type: "sucess",
                duration: 3000,
            },
        };
    },
    components: {
        HeaderAdmin,
        toastsVue,
        Usercard,
    },
    methods: {
        toast,
        async getall() {
            try {
                this.users = await UserService.getAll();
            } catch (error) {
                console.log(error);
                this.toast();
                setTimeout(() => {
                    this.$router.push({ name: "ShopMain" });
                }, 1000);
            }
        },
        async deleteUser(userId) {
            try {
                await UserService.delete(userId);
                this.users = this.users.filter(user => user._id !== userId);
                this.toast();
            } catch (error) {
                console.log(error);
                this.toasts.title = "Warning";
                this.toasts.msg = "Không xóa được, vui lòng thử lại sau!";
                this.toasts.type = "warn";
                this.toasts.duration = 2000;
                this.toastjs();
            }
        },

    },
    created() {
        this.getall();
    },
};
</script>

<template>
    <HeaderAdmin></HeaderAdmin>
    <toastsVue></toastsVue>
    <div class="main_admin d-flex" style="margin-top: 30px; margin-left: 100px;">
        <div class="list_users">
            <div style="margin-bottom: 5%;">
                <h4>Danh Sách Người dùng</h4>
            </div>
            <div class="list_item_user d-flex" id="user">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên đăng nhập</th>
                            <th scope="col">Email</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="user._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>
                                <span @click="deleteUser(user._id)" class="badge bg-danger text-dark">
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
