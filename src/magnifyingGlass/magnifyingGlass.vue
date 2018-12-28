<template>
  <div class="magnifying-glass" :style="smallboxstyle" ref="magnifying">
    <div ref="smallBox" class="small" :style="smallboxstyle"
      @mouseover="maskControl" @mouseout="maskControl" @mousemove="handleMousemove">
      <img :src="smallUrl" :width="smallSize" :height="smallSize" alt="img is missing"/>
      <div ref="mask" class="mask" :style="maskstyle" v-show="showMask"></div>
    </div>
    <div ref="bigBox" class="big" :style="bigboxstyle" v-show="showMask">
      <img ref="bigImg" :src="bigUrl" :width="bigSize" :height="bigSize" alt="img is missing"/>
    </div>
  </div>
</template>

<script>

export default {
  name: "hMagnifyingGlass",
  props: {
    smallUrl: {  //小图地址
      type: String,
      required: true,
      default: ""
    },
    bigUrl: {  //大图地址
      type: String,
      required: true,
      default: ""
    },
    smallSize: {  //小图片大小
      type: Number,
      default: 350
    },
    bigSize: {  //大图片大小
      type: Number,
      default: 800
    },
    maskColor: {  //移动遮罩颜色值
      type: String,
      default: "rgba(255, 255, 0, 0.4)"
    },
    gap: {  //小图与大图之间间隔
      type: Number,
      default: 10
    }
  },
  data(){
    return {
      showMask: false
    }
  },
  computed: {
    smallboxstyle(){
      return {
        width: this.smallSize + 'px',
        height: this.smallSize + 'px'
      }
    },
    bigboxstyle(){
      var size = (this.bigSize / 2) + 'px';
      return {
        width: size,
        height: size,
        left: (this.smallSize + this.gap) + 'px'
      }
    },
    maskstyle(){
      var size = (this.smallSize / 2) + 'px';
      return {
        width: size,
        height: size,
        'background-color': this.maskColor
      }
    }
  },
  methods: {
    maskControl(){
      this.showMask = !this.showMask
    },
    handleMousemove(e){

      const box = this.$refs.magnifying,
            smallBox = this.$refs.smallBox,
            mask = this.$refs.mask,
            bigBox = this.$refs.bigBox,
            bigImg = this.$refs.bigImg;

      var disX = e.pageX - box.offsetLeft;
      var disY = e.pageY - box.offsetTop;
      
      var x = disX - mask.offsetWidth/2;
      var y = disY - mask.offsetHeight/2;
      
      var maxX = box.offsetWidth - mask.offsetWidth; //mask 的最大水平移动距离
      var maxY = box.offsetHeight - mask.offsetHeight; // mask 的最大垂直移动距离
      
      if(x <= 0){
          x=0;
      }
      if(x >= maxX){
          x = maxX;
      }
      if(y < 0){
          y = 0 ;
      }
      if(y >= maxY){
          y = maxY;
      }
      
      mask.style.left = x + "px";
      mask.style.top = y + "px";
      
      // 大图片等比例移动
      bigImg.style.left = - x /smallBox.offsetWidth * bigImg.offsetWidth + "px";
      bigImg.style.top = - y /smallBox.offsetHeight * bigImg.offsetHeight + "px";
    }
  }
}
</script>

<style lang="scss" scoped>

  .magnifying-glass {
    border: 1px solid #ccc;
    position: relative;
    img{
      vertical-align: top;
    }

    .small {
      position: relative;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        cursor: move;
      }
    }
    
    .big {
      position: absolute;
      top: 0;
      border: 1px solid #ccc;
      overflow: hidden;
      img{
        position: absolute;
      }
    }

  }


</style>


