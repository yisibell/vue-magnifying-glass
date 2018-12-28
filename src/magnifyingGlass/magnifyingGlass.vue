<template>
  <div class="magnifying-glass" ref="magnifying">
    <div ref="smallBox" class="small" @mouseover="maskControl" @mouseout="maskControl" @mousemove="handleMousemove">
      <img :src="smallUrl" width="350" alt=""/>
      <div ref="mask" class="mask" v-show="showMask"></div>
    </div>
    <div ref="bigBox" class="big" v-show="showMask">
      <img ref="bigImg" :src="bigUrl" width="800" alt=""/>
    </div>
  </div>
</template>

<script>

export default {
  name: "hMagnifyingGlass",
  props: {
    smallUrl: {  //小图地址
      type: String,
      default: ""
    },
    bigUrl: {  //大图地址
      type: String,
      default: ""
    }
  },
  data(){
    return {
      showMask: false
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
    width: 350px;
    height: 350px;
    margin: 100px;
    border: 1px solid #ccc;
    position: relative;

    img{
      vertical-align: top;
    }

    .small {
      position: relative;

      .mask {
        width: 175px;
        height: 175px;
        background: rgba(255, 255, 0, 0.4);
        position: absolute;
        top: 0;
        left: 0;
        cursor: move;
      }
    }
    
    .big {
      width: 400px;
      height: 400px;
      position: absolute;
      top: 0;
      left: 360px;
      border: 1px solid #ccc;
      overflow: hidden;
     
      img{
        position: absolute;
      }
    }
  }


</style>


