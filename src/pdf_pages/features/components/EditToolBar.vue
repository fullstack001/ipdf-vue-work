<template>
  <div class="toolbar">
    <div class="stepper">
      <div class="arrow">
        <i class="fa-solid fa-chevron-up" style="font-size: medium"></i>
      </div>
      <div class="arrow">
        <i class="fa-solid fa-chevron-down" style="font-size: medium"></i>
      </div>
      <div class="info">
        <input
          type="number"
          :max="34"
          :min="1"
          style="width: 40px; height: 24px; margin-right: 3px"
          value="4"
        />
        / 35
      </div>
    </div>

    <div class="tool">
      <button class="tool-button active">
        <i class="fa-regular fa-hand" title="Free Hand" id="free_hand"></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i class="fa fa-pencil" title="Pencil"></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i class="fa fa-font" title="Add Text"></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i class="fa-solid fa-shapes"></i>
      </button>
    </div>
    <div class="tool">
      <button class="tool-button">
        <i class="fa-regular fa-image" title="Add an Image"></i>
      </button>
    </div>

    <div class="tool">
      <button class="tool-button">
        <i class="fa fa-trash"></i>
      </button>
    </div>
  </div>
</template>
<style scoped>
.toolbar {
  width: 100%;
  background-color: #f5f5fa;
  height: 50px;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 5px 0px 5px 0px rgba(87, 81, 81, 0.75);
  display: flex;
}
.arrow {
  background-color: white;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 1px;
  color: black;
  margin-left: 5px;
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  height: 50px;
  background-color: #f5f5fa;
  color: rgb(50, 54, 57);
  padding: 10px 0px;
  margin-right: 100px;
  margin-left: 50px;
}

.stepper .info {
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
}

button:focus {
  outline: 0;
}

.toolbar .tool {
  display: inline-block;
  color: rgb(50, 54, 57);
  height: 100%;
  padding-top: 10px;
  padding-left: 10px;
  margin-right: 5px;
}

.toolbar .tool label,
.toolbar .tool select,
.toolbar .tool input {
  display: inline-block;
  width: auto;
  height: auto !important;
  padding: 0;
}

.toolbar .tool input {
  width: 50px;
}

.toolbar .tool .color-tool {
  height: 25px;
  width: 25px;
  border-radius: 25px;
  border: 0;
  cursor: pointer;
  display: inline-block;
}

.toolbar .tool .tool-button {
  background-color: #f5f5fa;
  border: 0px solid rgb(50, 54, 57);
  color: rgb(50, 54, 57);
  cursor: pointer;
  margin: 5px 4px;
  font-size: 18px;
}

.toolbar .tool .tool-button:hover,
.toolbar .tool .tool-button.active {
  /* background-color: rgb(82, 86, 89); */
  /* border-color: rgb(82, 86, 89); */
  color: red;
}
</style>
