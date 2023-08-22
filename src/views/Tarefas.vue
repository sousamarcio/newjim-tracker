<template>
  <FormularioTracker @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <TarefaTracker
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <BoxTracker v-if="listaEstaVazia">
      Você não está muito produtivo hoje :(
    </BoxTracker>
    <div
      v-if="tarefaSelecionada"
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editando uma tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label">Descrição</label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Salvar alterações</button>
          <button class="button" @click="fecharModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import FormularioTracker from "../components/Formulario.vue";
import TarefaTracker from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxTracker from "../components/Box.vue";
import {
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
} from "@/store/tipo-acoes";
import { useStore } from "@/store";

export default defineComponent({
  name: "App",
  components: {
    FormularioTracker,
    TarefaTracker,
    BoxTracker,
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal(): void {
      this.tarefaSelecionada = null;
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
