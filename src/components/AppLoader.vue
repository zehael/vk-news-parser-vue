<template>
  <div class="loading">
    <a-spin size="large" />
    <p>Загрузка постов...</p>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/vars";
.loading {
  border: $red 1px solid;
  width: 100%;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
