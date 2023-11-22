<template>
  <footer class="text-center text-lg-start bg-light text-muted">
    <section class="">
      <div class="container text-center text-md-start mt-5">
        <div class="row mt-3">
          <div class="col-md-3 col-lg-4 col-xl-3 ml-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              <i class="fa-solid fa-book me-2"></i>Book Library
            </h6>
            <a class="navbar-brand" href="#">
              <img src="../img/logo1.png" alt="logo.vn" style="width: 100%; height: 90%;">
            </a>
          </div>
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              Danh mục
            </h6>
            <p>
              <router-link to="/sachmoi" class="text-reset">Sách mới</router-link>
            </p>
            <p>
              <router-link to="/banchay" class="text-reset">Sách bán chạy</router-link>
            </p>
            <p>
              <a href="#vanhocvietnam" class="text-reset">Văn học Việt Nam</a>
            </p>
            <p>
              <router-link to="/foreign" class="text-reset">Văn học nước ngoài</router-link>
            </p>
            <p>
              <a href="#lichsu" class="text-reset">Lịch sử</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Triết học</a>
            </p>
          </div>
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <p>
              <a href="#!" class="text-reset">Tâm lý học</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Kinh tế</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Toán học</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Vật lý</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Hóa học</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Sinh học</a>
            </p>
            <p>
              <a href="#!" class="text-reset">Thiên văn học</a>
            </p>
          </div>
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">
              Liên hệ
            </h6>
            <p><i class="fas fa-home me-3"></i>Ninh Kiều - Cần Thơ</p>
            <p>
              <i class="fas fa-envelope me-3"></i>
              lamnt2210@gmail.com
            </p>
            <p><i class="fas fa-phone me-3"></i> + 0917687193</p>
            <p><i class="fas fa-print me-3"></i> + 0123456789</p>
            <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
              <div>
                <a href="" class="me-4 text-reset">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="" class="me-4 text-reset">
                  <i class="fab fa-google"></i>
                </a>
                <a href="" class="me-4 text-reset">
                  <i class="fab fa-instagram"></i>
                </a>
                <a href="" class="me-4 text-reset">
                  <i class="fab fa-linkedin"></i>
                </a>
                <a href="" class="me-4 text-reset">
                  <i class="fab fa-github"></i>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
    <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
      BOOK LIBRARY © 2023 
    </div>
  </footer>
</template>