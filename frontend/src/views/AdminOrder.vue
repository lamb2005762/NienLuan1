<script>
import HeaderAdmin from "../components/HeaderAdmin.vue";
import toastsVue from '../components/toasts.vue';
import OrderService from '../services/Order.service';

export default {
    components: {
        HeaderAdmin,
        toastsVue,
    },
    data() {
        return {
            orders: [], // Mảng để lưu danh sách đơn hàng
        };
    },
    created() {
        // Gọi phương thức để lấy danh sách đơn hàng khi trang được tạo
        this.getOrders();
    },
    methods: {
        async getOrders() {
            try {
                // Gọi OrderService để lấy danh sách đơn hàng
                this.orders = await OrderService.getAll();
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        },
        formatDate(date) {
            // Hàm định dạng ngày thành chuỗi có định dạng
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Date(date).toLocaleDateString('en-US', options);
        },
        async deleteOrder(orderId) {
            try {
                // Gọi OrderService để xóa đơn hàng với ID tương ứng
                await OrderService.delete(orderId);

                // Sau khi xóa thành công, cập nhật danh sách đơn hàng
                this.getOrders();
                
                
            } catch (error) {
                console.error('Error deleting order:', error);

            }
        },
    },
};
</script>
  

<template>
    <div>
        <HeaderAdmin></HeaderAdmin>
        <toastsVue></toastsVue>
        <div class="main_admin d-flex" style="margin-top: 30px; margin-left: 100px;">
            <div>
                <div style="margin-bottom: 5%;">
                    <h4>Danh Sách Sản Phẩm</h4>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Người đặt</th>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Ngày đặt hàng</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, index) in orders" :key="order._id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ order._id }}</td>
                            <td>{{ order.userId }}</td>
                            <td>{{ formatDate(order.createdAt) }}</td>
                            <td> {{ order.status }}</td>
                            <td>{{ order.quantity }}</td>
                            <td>
                                <span @click="deleteOrder(order._id)" class="badge bg-danger text-dark"
                                    style="margin: 15%;">
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
  
