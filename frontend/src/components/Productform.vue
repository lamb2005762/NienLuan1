<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  export default{
      props:{
          product: { type: Object, required: true },
          resetAfterSubmit: { type: Boolean, default: false },
      }
      ,
     data() {
        const productform = yup.object().shape({
            name: yup
            .string()
            .required("Tên phải có giá trị.")
            .min(5, "Tên phải ít nhất 5 ký tự."),
             img: yup
            .string()
            .required("Hình ảnh phải có giá trị."),
            price: yup
            .string()
            .required("Giá sản phẩm phải có giá trị."),
            description: yup
            .string()
            .required("Mô tả sản phẩm phải có giá trị.")
            .min(5, "Tên phải ít nhất 5 ký tự."),
            category: yup
            .string()
            .required("Loại sản phẩm phải có giá trị."),
            });
            return {
            productLocal:this.product,
            productform,
            }
        },
    components:{
      Form,
      Field,
      ErrorMessage
    },
    emits:['submit:product'],
    methods:{
      submitproduct(){
          this.$emit('submit:product',this.productLocal);
          	if (this.resetAfterSubmit) {
				    this.$refs.contactForm.resetForm();
			  }
      },
    }
  }
</script>
<template>
<div class="wrapper">
    <Form :validation-schema="productform"  @submit="submitproduct" >
      <div class="form-group">
        <label for="nameproduct">Tên sản phẩm</label>
        <Field type="text" class="form-control" id="nameproduct" name="name" placeholder="Nhập tên sản phẩm" v-model="productLocal.title" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
    <div class="form-group">
        <label for="imgproduct">Hình ảnh</label>
        <div style="display: flex; flex-direction: row;">
        <Field type="text" class="form-control" id="imgproduct" name="img" placeholder="Nhập link sản phẩm" v-model="productLocal.img[0]"/>
        </div>
      </div>
      <div class="form-group">
        <label for="priceproduct">Giá</label>
        <Field type="number" class="form-control" id="priceproduct" name="price" placeholder="Nhập giá sản phẩm" v-model="productLocal.price" />
        <ErrorMessage name="price" class="text-danger"  />
      </div>
      <div class="form-group">
        <label for="nameproduct">Mô tả</label>
        <Field type="text" class="form-control" id="nameproduct" name="description"  placeholder="Nhập mô tả sản phẩm" v-model="productLocal.desc"/>
          <ErrorMessage name="description" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="categoryproduct">Danh mục</label>
        <Field type="text" class="form-control" id="categoryproduct" name="category" placeholder="Nhập danh mục sản phẩm" v-model="productLocal.categories"/>
          <ErrorMessage name="category" class="text-danger" />
      </div>
      <button type="submit" class="btn btn-success" style="margin: 10px;">Lưu</button>
       <router-link to="/admin" style="margin: 10px;">
            <button class="btn btn-danger">Trở về</button>
        </router-link>
      <br>
    </Form>
</div>
</template>
<style scoped>
.wrapper{
    margin: 50px 200px;
}
.btn_img-add{
 font-size: 30px; 
 color: dodgerblue;
}
</style>