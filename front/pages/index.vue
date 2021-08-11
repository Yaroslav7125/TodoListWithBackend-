<template>
  <div class="container-fluid">
    <div class="main-screen d-flex">
      <div class="main-screen-first-part">
        <div class="post-screen">
          <div class="post-screen-content">
            <div class="post-sctreen-content-fp d-flex justify-content-between">
              <div class="post-fp-left-part">
                <span>Himalayan sunset</span>
              </div>
              <div class="post-fp-right-part d-flex align-items-center">
                <img src="@/static/img/DoneBadge.svg" alt="">
                <span>49 minutes ago</span>
                <img src="@/static/img/UpStroke.svg" alt="">
              </div>
            </div>
            <div class="post-content-img">
              <img src="@/static/img/SunsetImage.png" alt="">
            </div>
          </div>
          <div class="post-screen-comments">
            <div class="comment-author-line">
              <img src="@/static/img/comment_line.svg" alt="">
              <a href="#"><span>Kirill Dashkevich</span></a>
              <span>commented:</span>
            </div>
            <div class="comments-first-section">
              <div class="comment">
                <div class="comment-text">
                  <p>
                    The sun disappearing behind the Himalayas. This was taken from near the
                    Tungnath temple (~3500m) in the Garwhal Himalayas near Chopta.
                    I think this is probably my favourite of all of the sunset photos
                  </p>
                </div>
                <div class="comment-author-data">
                  <span>— Kirill, 10:39 am</span>
                </div>
              </div>
              <div class="comments-second-section d-flex justify-content-between">
                <div class="post-last-line-fp d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <img src="@/static/img/eye.svg" alt="">
                    <span>438</span>
                    <img src="@/static/img/comment_line.svg" alt="">
                    <span>71</span>
                  </div>
                </div>
                <div class="post-last-line-sp">
                  <span>Read post</span>
                  <img src="@/static/img/right_stroke.svg" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-screen-last-line d-flex justify-content-between">
          <div class="last-line-fp">
            Conservation with James
          </div>
          <div class="last-line-sp">
            <img src="@/static/img/DownStroke.svg" alt="">
          </div>
        </div>
      </div>
      <div class="main-screen-second-part d-flex flex-column ">
        <div class="personal-card d-flex flex-column align-items-center">
          <img src="@/static/img/pain.svg" alt="">
          <span class="personal-card-name">Harold Pain </span>
          <span class="personal-card-prof">UX/UI designer</span>
          <div class="vk-badge">
            <img src="@/static/img/vk.svg" alt="">
            <img src="@/static/img/vk.svg" alt="">
            <img src="@/static/img/vk.svg" alt="">
          </div>
        </div>
        <div class="personal-nav-bar">
          <div class="nav-bar-box d-flex justify-content-between">
            <span>Navigation</span>
            <img src="@/static/img/DownStroke.svg" alt="">
          </div>
          <div class="nav-list">
            <div class="nav-list-item">
              <img src="@/static/img/User.svg" alt="">
              <span>My profile</span>
            </div>
            <div class="nav-list-item d-flex align-content-center justify-content-between">
              <div class=" d-flex align-content-center">
                <img src="@/static/img/User.svg" alt="">
                <span>Balance</span>
              </div>
              <span class="nav-list-price">$1,456</span>
            </div>
            <div class="nav-list-item d-flex justify-content-between">
              <div class="nav-list-item-fp d-flex align-content-center">
                <img src="@/static/img/User.svg" alt="">
                <span>Connections</span>
              </div>
              <div class="connections-count  d-flex justify-content-between align-content-center">
                47
              </div>
            </div>
            <div class="nav-list-item hr-line">
              <img src="@/static/img/User.svg" alt="">
              <span>Friends</span>
            </div>                             <!-- connections and account settings -->
            <div class="nav-list-item d-flex justify-content-between">
              <div class="nav-list-item-fp d-flex align-content-center">
                <img src="@/static/img/User.svg" alt="">
                <span>Connections</span>
              </div>
              <div class="connections-count connections-blue d-flex justify-content-between align-content-center">
                47
              </div>
            </div>
            <div class="nav-list-item">
              <img src="@/static/img/User.svg" alt="">
              <span>Account settings</span>
            </div>
          </div>
        </div>
        <div class="second-part-thoughts">
          <div class="thoughts-line-nav hr-line d-flex justify-content-between">
            <span>Share yuor thoughts</span>
            <img src="@/static/img/DownStroke.svg" alt="">
          </div>
          <div class="thoughts-input-section">
            <textarea placeholder="Enter your message..." name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>
<style scoped>
.post-screen{
  background-color: #fff;
  margin-top: 24px;
}
.main-screen-first-part{
  width: 100%;
}
.post-screen{
  padding: 16px;
  border: 1px solid #DDE0E6;
  width: 100%;
}
.post-fp-right-part{
  padding-bottom: 16px;
}
.post-content-img img{
  width: 100%;
}
.post-fp-right-part span{
  margin-left: 16px;
  margin-right: 16px;
}
.comment-author-line{
  padding-bottom: 16px;
  padding-top: 16px;
  font-family: Roboto;
}
.comment-author-line img{
  margin-right: 8px;
}
.comment{
  padding-left: 16px;
  border-left: 2px solid #C4C4C4;
}
.comment-text p{
  margin-bottom: 0px;
  padding-bottom: 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #2D2F33;
}
.comment-author-data span{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #6E7178;
}
.comments-second-section{
  padding-top: 16px;
}
.comments-second-section img{
  margin-right: 8px;
}
.post-last-line-fp span{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #2D2F33;
  margin-right: 16px;
}
.post-last-line-sp{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #6E7178;
}
.main-screen-last-line{
  padding: 16px;
  margin-top: 24px;
  background-color: #fff;
  border: 1px solid #DDE0E6;
  width: 100%;
}
/*--------------------------------------------------*/
.main-screen-second-part{
  margin-top: 24px;
  margin-left: 24px;

}
.personal-card{
  background-color: #fff;
  border: 1px solid #DDE0E6;
}
.personal-card img{
  max-width: 144px;
  max-height: 144px;
  margin-top: 32px;
}
.personal-card-name{
  margin-top: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.005em;
  color: #000000;

}
.personal-card-prof{
  margin-top: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #A1A5AE;
}
.vk-badge img{
  margin-top: 20px;
  margin-bottom: 40px;
  padding-left: 5px;
  padding-right: 5px;
}
.personal-nav-bar{
  background-color: #fff;
  border: 1px solid #DDE0E6;
  margin-top: 24px;
}
.nav-bar-box{
  padding:12px 24px 12px 24px;
  border-bottom:1px solid #DDE0E6
}
.nav-list-item{
  padding: 12px 24px;
  display: flex;
  align-items: center;
}
.nav-list-item img{
  margin-right: 16px;
}
.nav-list-item{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #2D2F33;
}
.hr-line{
  border-bottom:1px solid #DDE0E6
}
.second-part-thoughts{
  border: 1px solid #DDE0E6;
  background-color: #fff;
}
.thoughts-line-nav{
  padding:12px 24px 12px 12px;

}
.thoughts-input-section{
  padding:24px 24px 12px 12px;
}
.thoughts-input-section textarea{
  padding: 24px 24px 12px;
}
.nav-list-price{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.005em;
  color: #A1A5AE;
}
.connections-count{
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 8px;
  background-color: #EF4115;
}
.connections-count{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.015em;
  color: #FFFFFF;
}
.connections-blue{
  background-color: #26A69A;
}
.thoughts-input-section textarea{
  resize: none;
  outline: 1px solid #DDE0E6;
  border: none;
  height: 110px;
}

</style>
