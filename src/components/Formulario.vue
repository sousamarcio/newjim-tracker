<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </div>
      <div class="column id-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              v-for="projeto in projetos"
              :value="projeto.id"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorTracker @aoTemporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import TemporizadorTracker from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "FormularioTracker",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorTracker,
  },
  data() {
    return {
      descricao: "",
      idProjeto: "",
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      const projeto = this.projetos.find((proj) => proj.id == this.idProjeto);
      if (!projeto) {
        this.store.commit(NOTIFICAR, {
          titulo: "Ops!",
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoNotificacao.FALHA,
        });
        return;
      }

      this.$emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: projeto,
      });
      this.descricao = "";
    },
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos),
      store,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
