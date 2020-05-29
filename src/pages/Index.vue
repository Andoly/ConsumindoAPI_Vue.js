<template>
  <q-page class="flex flex-center">
     <q-skeleton width="100%" height="calc(100vh - 90px)" v-show="carregando" />
     <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      class="carrossel"
      ref="carrossel"
      transition-next="slide-left"
      transition-prev="slide-right"
      v-show="!carregando && imagens.length > 0"
      :autoplay="autoPlay"
    >
      <q-carousel-slide v-for="(foto, index) in imagens" :name="index" :key="index" :img-src="foto.url" />
    </q-carousel>
    <div class="column" v-show="!carregando && imagens.length === 0">
      <div class="text-h6">Nenhuma imagem encontrada !</div>
      <q-btn @click="$emit('abrir-modal')" class="q-my-md" label="Clique para realizar outra busca" rounded unelevated color="primary" />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 0
    }
  },
  mounted () {
    this.$store.dispatch('fotos/pullFotos', { param: null })
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 39) {
        this.$refs.carrossel.next()
      }
      if (e.keyCode === 37) {
        this.$refs.carrossel.previous()
      }
    })
  },
  computed: {
    imagens () {
      return this.$store.getters['fotos/getFotos']
    },
    carregando () {
      return this.$store.getters['fotos/getCarregando']
    },
    autoPlay () {
      return this.$store.getters['fotos/getAutoPlay']
    }
  }
}
</script>

<style lang="scss">
.carrossel {
  width: 100%;
  height: calc(100vh - 90px);
}
</style>
