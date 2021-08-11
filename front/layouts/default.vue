<template>
  <div class="header-content">
    <div class="d-flex justify-content-between first__part__header">
      <div class="fph-first-part link">
        <img src="@/static/img/stroke.svg" alt="">
        <span class="fph-span">User Pages</span>
      </div>
      <div class="fph-second-part d-flex align-content-center">
        <img src="@/static/img/small_bell.svg" alt="">
        <img src="@/static/img/User.svg" alt="">
      </div>
    </div>
    <div class="d-flex justify-content-between second-part-h">
      <div class="first-part d-flex  ">
        <nuxt-link exact no-prefetch active-class="active" to="/">
          <div class="link link-sph">
            <img src="@/static/img/Activity.svg" alt="">
            <span class="sph-link">Activity</span>
          </div>
        </nuxt-link>
        <nuxt-link no-prefetch active-class="active" to="/map">
          <div class="link link-sph">
            <img src="@/static/img/Calendar.svg" alt="">
            <span class="sph-link">Map</span>
          </div>
        </nuxt-link>

        <nuxt-link no-prefetch active-class="active" to="/time">
          <div class="link link-sph">
            <img src="@/static/img/Gear.svg" alt="">
            <span class="sph-link">Time</span>
          </div>
        </nuxt-link>
        <nuxt-link no-prefetch active-class="active" to="/todo">
          <div class="link link-sph">
            <img src="@/static/img/List.svg" alt="">
            <span class="sph-link">Todo list</span>
          </div>
        </nuxt-link>
      </div>
      <div class="second-part d-flex">
        <div class="link link-sph">
          <img src="@/static/img/List.svg" alt="">
          <span>Notes</span>
        </div>
        <div class="link link-sph">
          <img src="@/static/img/User.svg" alt="">
          <span>Friends</span>
        </div>
        <div class="link link-sph">
          <img src="@/static/img/User.svg" alt="">
          <span>Photos</span>
        </div>
        <div class="link link-sph">
          <img src="@/static/img/Gear.svg" alt="">
          <img src="@/static/img/DownStroke.svg" alt="">
        <!-- next Photos -->
        </div>
      </div>
    </div>
    <div class="main-content">
      <nuxt />                    <!-- content -->
    </div>
  </div>
</template>

<script>

export default {
  mounted: function () {
    this.$store.dispatch('startTimer'); /// запуск таймера
  },

};
</script>

<style scoped>
.header-content{
  background-color: #fff;
}
.link{
  display: flex;
  align-items: center;

}
.link:hover{
  color: #2375E1;
}
.first__part__header{
  padding: 20px;
  border-bottom: 1px solid #DDE0E6;
}
.fph-second-part img{
  margin-left: 10px;
  margin-right: 10px;
}
.link-sph{

  margin-left: 20px;
  margin-top: 16px;
  padding-bottom: 9px;
}
.link-sph img{
  margin-right: 8px;
}
.second-part-h{
  border-bottom: 1px solid #DDE0E6;
}
.fph-first-part span{
  margin-left: 23px;
}
.main-content{
  background-color: #F4F7FB
}
.active div{
  border-bottom: 3px solid #2375E1;
  color: #2375E1;
}

.active div span{
  color: #2375E1;
}
a{
  text-decoration: none;
}
.link span{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.015em;
  color: #6E7178;
}
.link:hover span{
   color: #2375E1;
}

</style>
