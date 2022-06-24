<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <FormularioTracker />
      <div class="lista">
        <TarefaTracker />
        <TarefaTracker />
        <TarefaTracker />
        <TarefaTracker />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import FormularioTracker from "./components/Formulario.vue";
import TarefaTracker from "./components/Tarefa.vue";

export default defineComponent({
  name: "App",
  components: {
    BarraLateral,
    FormularioTracker,
    TarefaTracker,
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
</style>
