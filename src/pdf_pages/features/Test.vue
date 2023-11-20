<template>
  <div>
    <h2>Drag and Drop Element List</h2>
    <draggable v-model="elementList" :options="{ animation: 150 }">
      <div v-for="element in elementList" :key="element.id" class="drag-item">
        {{ element.name }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      elementList: [
        { id: 1, name: "Element 1" },
        { id: 2, name: "Element 2" },
        { id: 3, name: "Element 3" },
        // Add more elements as needed
      ],
    };
  },
};
</script>

<style>
.drag-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
  cursor: grab;
}
</style>
