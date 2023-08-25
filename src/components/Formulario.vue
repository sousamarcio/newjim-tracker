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
import { computed, defineComponent, ref } from "vue";
import TemporizadorTracker from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "FormularioTracker",
  emits: ["aoSalvarTarefa"],
  components: {
    TemporizadorTracker,
  },
  setup(props, { emit }) {
    const store = useStore(key);
    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const { notificar } = useNotificador();

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find((proj) => proj.id == idProjeto.value);
      if (!projeto) {
        notificar(
          TipoNotificacao.FALHA,
          "Ops!",
          "Selecione um projeto antes de finalizar a tarefa!"
        );
        return;
      }

      emit("aoSalvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projeto,
      });
      descricao.value = "";
    };

    return {
      projetos,
      descricao,
      idProjeto,
      notificar,
      finalizarTarefa,
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
