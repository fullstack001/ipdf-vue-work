<template>
  <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">
        <!-- header -->
        <div class="modal-header">
          <span class="modal-title"> {{ title }} </span>
        </div>
        <!-- body -->
        <div class="modal-body">
          <slot name="body">Default body</slot>
        </div>
        <div class="modal-footer">
          <button class="apply-btn" @click="$emit('apply_sign')">Apply</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.body.addEventListener("keyup", (e) => {
      if (e.key === "Escape") this.$emit("close");
    });
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
//animations
.modal-enter,
.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2);
}
.apply-btn {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 8px 20px;
  text-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0);
  text-decoration: none;
  border-radius: 8px;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  -webkit-transition: all 0.1s linear;
  -o-transition: all 0.1s linear;
  transition: all 0.1s linear;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  letter-spacing: 0;
  min-height: 42px;
  color: #fff;
  background-color: #e5322d;
}
.modal__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00, 00, 00, 0.48);
}

.modal-content {
  position: relative;
  max-width: 800px !important;
  max-height: 500px !important;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all 0.2s ease;
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;

  @media screen and (min-width: 900px) {
    min-width: 900px;
    min-height: 600px;
  }
}

.modal-header {
  display: flex;
  align-self: left;
  justify-content: space-between;
  padding-top: 0px !important;

  span {
    font-size: 24px;
  }

  .button-close {
    cursor: pointer;
  }
}
.modal-footer {
  margin-top: 30px;
}
.modal-body {
  text-align: center;
}

.modal-bottom {
  padding-top: 40px;
}

a.another-modal {
  color: #000;
  border-bottom: 1px solid #000;
}
</style>
