<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-dialog v-model="modal">
        <q-card>
          <q-card-section>
            <div class="text-h6">Digite sua busca</div>
            <span style="color: #808fa3; font-size: 10px; line-height: 10px;">Ex: guitar</span>
            <div class="flex q-gutter-md">
              <q-input clearable @keyup.enter="chamarApi"  v-model="busca" dense outlined bg-color="white" label="Busca" />
              <q-btn @click="chamarApi" :disable="carregando" no-caps color="primary" rounded unelevated :label="carregando ? 'Buscando...' : 'Buscar'" />
              <!--
                v-on:click="" === @click
                v-bind:carregando === :carregando
               -->
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>

      <div>
        <q-btn @click="ultimasFotos" flat color label="Últimas" />
        <q-btn @click="abrirModal" flat color label="Buscar" />
        <q-btn @click="habilitarAutoplay" flat color round :icon="autoPlay ? 'pause' : 'play_arrow'">
          <q-tooltip>{{ autoPlay ? 'Desativar' : 'Ativar' }} AutoPlay</q-tooltip>
        </q-btn>
      </div>
    </q-header>

    <q-page-container>
      <router-view @abrir-modal="abrirModal" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      modal: false,
      busca: ''
    }
  },
  methods: {
    abrirModal () {
      this.busca = ''
      this.modal = true
    },
    chamarApi () {
      this.$store.dispatch('fotos/pullFotos', { param: this.busca })
    },
    habilitarAutoplay () {
      this.$store.commit('fotos/putAutoPlay', !this.autoPlay)
    },
    ultimasFotos () {
      this.$store.dispatch('fotos/pullFotos', { param: null })
    }
  },
  computed: {
    carregando () {
      return this.$store.getters['fotos/getCarregando']
    },
    autoPlay () {
      return this.$store.getters['fotos/getAutoPlay']
    }
  },
  watch: {
    carregando (agora, antes) {
      if (agora !== antes && antes === true) {
        this.modal = false
      }
    }
  }
}
</script>
