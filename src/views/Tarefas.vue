<template>
    <FormularioTracker @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <TarefaTracker v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <BoxTracker v-if="listaEstaVazia">
            Você não está muito produtivo hoje :(
        </BoxTracker>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioTracker from "../components/Formulario.vue";
import TarefaTracker from "../components/Tarefa.vue";
import ITarefa from '../interfaces/ITarefa';
import BoxTracker from '../components/Box.vue';

export default defineComponent({
    name: "App",
    components: {
        FormularioTracker,
        TarefaTracker,
        BoxTracker
    },
    data () {
        return {
        tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia () : boolean {
        return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa (tarefa: ITarefa) {
        this.tarefas.push(tarefa)
        },
    }
});
</script>
  