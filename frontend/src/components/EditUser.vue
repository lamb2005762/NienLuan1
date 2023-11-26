<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import UserService from "../services/User.service";
import toast from "../assets/js/toasts";
import { mapActions } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
export default {
  props: { user: Object },
  data() {
    const userform = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(3, "Tên phải ít nhất 3 ký tự."),
      email: yup
        .string()
        .required("Email phải có giá trị")
        .email("Email không hợp lệ"),
      pwd: yup
        .string()
        .required("Mật khẩu phải có giá trị"),
      fullname: yup
        .string()
        .required("Vui lòng cập nhật họ tên"),
      phoneNumber: yup
        .string()
        .required("Vui lòng cập nhật số điện thoại"),
      address: yup
        .string()
        .required("Vui lòng cập nhật địa chỉ"),
    });
    return {
      userform,
      infouser: this.user,
      toasts: {
        title: "",
        msg: "",
        type: "",
        duration: 0
      },
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  methods: {
    toast,
    ...mapActions(useAuthStore, ["logout"]),
    async updateUser() {
      try {
        await UserService.update(this.infouser._id, this.infouser);
        this.toasts.title = "Success",
          this.toasts.msg = "Đã sửa thông tin vui lòng đăng nhập lại !",
          this.toasts.type = "success",
          this.toasts.duration = 3000
        this.toast();
        setTimeout(() => {
          this.logout();
          this.$router.push({ name: "login" });
        }, 2000);
      } catch (error) {
        this.toasts.title = "Faild",
          this.toasts.msg = "Có lỗi hoặc trùng tên người dùng",
          this.toasts.type = "error",
          this.toasts.duration = 3000
        this.toast();
        console.log(error);
      }
    },
  },
}
</script>
<template>
  <div class="wrapper">
    <Form :validation-schema="userform">
      <div class="form-group">
        <label for="nameproduct">Tên tài khoản:</label>
        <Field type="text" class="form-control" id="name" name="name" v-model="infouser.username"
          placeholder="Nhập tên tài khoản" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="nameproduct">Email:</label>
        <Field type="text" class="form-control" id="email" name="email" v-model="infouser.email"
          placeholder="Nhập email" />
        <ErrorMessage name="email" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="nameproduct">Họ tên:</label>
        <Field type="text" class="form-control" id="fullname" name="fullname" v-model="infouser.fullName"
          placeholder="Nhập họ tên" />
        <ErrorMessage name="fullname" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="nameproduct">Số điện thoại:</label>
        <Field type="text" class="form-control" id="phoneNumber" name="phoneNumber" v-model="infouser.phoneNumber"
          placeholder="Nhập số điện thoại" />
        <ErrorMessage name="phoneNumber" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="nameproduct">Địa chí:</label>
        <Field type="text" class="form-control" id="address" name="address" v-model="infouser.address"
          placeholder="Nhập địa chỉ" />
        <ErrorMessage name="address" class="text-danger" />
      </div>
      <button type="submit" class="btn btn-primary" @click="updateUser" style="margin: 10px;">Lưu</button>
      <br>
    </Form>
  </div>
</template>