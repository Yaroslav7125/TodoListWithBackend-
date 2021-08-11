<template>
  <div>
    <div class="timer">
      <div class="timer-content d-flex justify-content-between">
        <div class="timer-content-fp d-flex flex-column">
          <span>Timer</span>
          <span class="time-count" id="time">{{ getTime }}</span>
        </div>
        <div class="timer-content-sp">
          <img src="@/static/img/UpStroke.svg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getTime: function () {
      const sec = this.$store.state.time;
      const secStr = String(sec % 60).padStart(2, '0');
      const minutesStr = String(Math.trunc(sec / 60)).padStart(2, '0');
      const hoursStr = String(Math.trunc(sec / 3600)).padStart(2, '0');
      return `${hoursStr}:${minutesStr}:${secStr}`;
    },
  },
};
</script>
<style>
.timer{
 padding: 24px 32px;
}
.timer-content{
  border: 1px solid #DDE0E6;
  background-color: #fff;
  padding: 16px;
}
.timer-content-fp span{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #2D2F33;
}
.time-count{
  margin-top: 16px;
}
</style>
