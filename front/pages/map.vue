<template>
  <div class="content-container">
    <div class="map-box">
      <div class="map-line">
        <div class="map-caption d-flex justify-content-between">
          <span>Basic map</span>
          <img src="@/static/img/UpStroke.svg" alt="">
        </div>
      </div>
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
export default {
  mounted () {
    const loader = new Loader({
      apiKey: 'AIzaSyC0dy2XqP-GPUFSTeGTKpkmT55k9GdHzxU',
      version: 'weekly',
    });
    let map;
    loader.load().then((google) => {
        map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 17,
      });
      navigator.geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
          map.setCenter({
          lat: crd.latitude,
          lng: crd.longitude,
        });
        // eslint-disable-next-line
        new google.maps.Marker({
          position: {
            lat: crd.latitude,
            lng: crd.longitude,
          },
          map,
        });
      });
    });
  },
};

</script>

<style>
#map{
  width: 100%;
  height: 404px;
}
.content-container{
  padding: 16px;

}
.map-box{
  margin-top: 24px;
  background-color: #fff;
  padding: 16px;
  border: 1px solid #DDE0E6;
}
.map-caption span{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #2D2F33;
}
.map-caption{
  margin-bottom: 16px;
}
</style>
