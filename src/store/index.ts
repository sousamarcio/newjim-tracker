import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import INotificacao from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONA_PROJETO,
  ADICIONA_TAREFA,
  ALTERA_PROJETO,
  ATUALIZA_TAREFA,
  DEFINIR_PROJETOS,
  DEFINIR_TAREFAS,
  EXCLUIR_PROJETO,
  NOTIFICAR,
  REMOVE_TAREFA,
} from "./tipo-mutacoes";
import {
  ALTERAR_PROJETO,
  CADASTRAR_PROJETO,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
  REMOVER_PROJETO,
} from "./tipo-acoes";
import http from "@/http";

interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      state.tarefas.push(tarefa);
    },
    [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex((p) => p.id == tarefa.id);
      state.tarefas[indice] = tarefa;
    },
    [REMOVE_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter((p) => p.id != id);
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get("projetos").then((res) => commit(DEFINIR_PROJETOS, res.data));
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post("/projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http
        .delete(`/projetos/${id}`)
        .then(() => commit(EXCLUIR_PROJETO, id));
    },
    [OBTER_TAREFAS]({ commit }) {
      http.get("tarefas").then((res) => commit(DEFINIR_TAREFAS, res.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("/tarefas", tarefa)
        .then((res) => commit(ADICIONA_TAREFA, res.data));
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
