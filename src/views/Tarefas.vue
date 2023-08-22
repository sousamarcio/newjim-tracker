<template>
  <FormularioTracker @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaTracker
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
    />
    <BoxTracker v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </BoxTracker>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormularioTracker from "../components/Formulario.vue";
import TarefaTracker from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxTracker from "../components/Box.vue";
import { OBTER_PROJETOS, OBTER_TAREFAS, CADASTRAR_TAREFA } from "@/store/tipo-acoes";
import { useStore } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    FormularioTracker,
    TarefaTracker,
    BoxTracker,
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa (tarefa: ITarefa) {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    return {
      tarefas: computed(() => store.state.tarefas),
      store,
    };
  },
});
</script>
