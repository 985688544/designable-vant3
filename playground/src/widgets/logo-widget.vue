<template>
  <div class="logo-container">
    <a href="/">
      <img
        class="logo"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
        alt="Element Plus Logo"
      />
      <span class="logo-text">Vant</span>
    </a>
  </div>
</template>
<style scoped lang="less">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);
  .logo-text {
    color: #000000;
    font-size: 22px;
    font-weight: 500;
    margin-left: 10px;
  }
  a {
    height: 28px;
    width: 128px;
    display: flex;
    margin-left: 20px;
  }
  .logo {
    height: 100%;
    max-width: 100%;
  }
}
</style>
