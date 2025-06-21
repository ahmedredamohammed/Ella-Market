<template>
  <div class="banner">
    <div class="parent">
      <img src="@/assets/images/banner-bg.jpg" alt="" />
      <div class="cont">
        <h3>
          <span>Huge Saving</span> on<br />
          UHD Televisions
        </h3>
        <p class="hint">Sale up to 70% off on selected items</p>
        <v-btn
          variant="outlined"
          density="compact"
          width="160"
          height="50"
          style="text-transform: none; border-radius: 30px"
          >Show Now</v-btn
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppLayout",
};
</script>
<style scoped lang="scss">
.banner {
  .parent {
    height: 390px;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .cont {
      position: absolute;
      top: 20px;
      left: 40px;
      width: 600px;
      color: white;
      padding: 50px 0 0 80px;
      h3 {
        font-size: 45px;
        font-weight: bold;
        line-height: 1.2;
        span {
          color: aqua;
        }
      }
      .hint {
        margin: 20px 0 40px;
      }
    }
  }
}
// Media Queries
@media (max-width: 990px) {
  .banner {
    .parent {
      .cont {
        width: 500px;
        left: 0;
        h3 {
          font-size: 35px;
        }
      }
    }
  }
}
@media (max-width: 767px) {
  .banner {
    .parent {
      height: 320px;
      .cont {
        padding-left: 20px;
        width: 500px;
        left: 0;
        h3 {
          font-size: 30px;
        }
        .hint {
          font-size: 14px;
        }
      }
    }
  }
}
@media (max-width: 580px) {
  .banner {
    .parent {
      height: 250px;
      .cont {
        padding-left: 20px;
        padding-top: 20px;
        width: 80%;
        left: 0;
        h3 {
          font-size: 24px;
        }
        .hint {
          font-size: 12px;
        }
        button {
          height: 30px !important;
          width: 130px !important;
          font-size: 11px !important;
        }
      }
    }
  }
}
</style>
