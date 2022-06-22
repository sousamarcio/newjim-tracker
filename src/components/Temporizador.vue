<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroTracker :tempoEmSegundos="tempoEmSegundos" />
    <BotaoTracker :texto="textoBtn1" :icone="play"
    :disabled="cronometroRodando" 
    :cronometroRodando="cronometroRodando" 
    @click="iniciar" />
    <BotaoTracker :texto="textoBtn2" :icone="stop"
     :cronometroRodando="cronometroRodando"
     :disabled="!cronometroRodando"
     @click="finalizar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CronometroTracker from "./Cronometro.vue";
import BotaoTracker from "./Botao.vue";

export default defineComponent({
  name: "TemporizadorTracker",
  emits: ["aoTemporizadorFinalizado"],
  components: {
    CronometroTracker,
    BotaoTracker
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
      textoBtn1: 'play',
      textoBtn2: 'stop',
      play: 'fas fa-play',
      stop: 'fas fa-stop'
    };
  },
  methods: {
    iniciar(): void {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1;
      }, 1000);
    },
    finalizar(): void {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("aoTemporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    }
  }
});
</script>
