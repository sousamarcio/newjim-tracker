<template>
  <button class="button">
    <span class="icon">
      <i :class="icone"></i>
    </span>
    <span>{{texto}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BotaoTracker",
  props: {
    texto: {
      type: String,
      default: "",
    },
    icone: {
      type: String,
      default: ""
    },
    cronometroRodando: {
        type: Boolean,
        default: false
    }
  }
});
</script>
