<template>
  <div class="row">
    <div class="col-md-7 sign_panel">
      <h1 class="text-center">PDFDEN</h1>
      <h4 class="card-title mt-3 text-center">Create new account</h4>
      <p>
        <a href="" class="btn btn-block btn-twitter">
          <i class="fab fa-twitter"></i>   Login via Twitter</a
        >
        <a href="" class="btn btn-block btn-facebook text-white">
          <i class="fab fa-google"></i>   Login via Google</a
        >
      </p>
      <form>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Full name"
            type="text"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Email address"
            type="email"
          />
        </div>

        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Create password"
            type="password"
          />
        </div>

        <!-- form-group// -->
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Create New Account
          </button>
        </div>
        <!-- form-group// -->
        <p class="text-center">Have an account? <a href="">Log In</a></p>
      </form>
    </div>
    <div class="sign-right col-md-5 padding-auto" p-5>
      <img src="@/assets/img/pdfden.png" class="m-5" width="400px" />
      <div class="title mt-2 mb-2">PDF tools for productive people</div>
      <div style="font-size: 20px; margin-top: 40px">
        iLovePDF helps you convert, edit, e-sign, and protect PDF files quickly
        and easily. Enjoy a full suite of tools to effectively manage documents
        —no matter where you’re working.
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.form-group {
  margin-top: 30px;
}
.sign_panel {
  background-color: #fffdfd;
  padding: 270px;
  padding-top: 100px;
}
input {
  padding-left: 20px;
}

.btn-facebook {
  background-color: #405d9d;
  color: #fff;
}
.btn-twitter {
  background-color: #42aeec;
  color: #fff;
}
.sign-right {
  padding: 136px;
  background-color: #f2f3f8;
}
.title {
  font-size: 30px;
  font-weight: bold;
}
</style>
