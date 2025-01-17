<script setup lang="ts">
import { useTitle } from "@/hooks/useTitle";
import { forward } from "@/utils/router";

const { title, changeTitle } = useTitle();
function goTest() {
  forward("test", {
    a: 1,
  });
}
</script>

<template>
  <view class="content">
    <uni-badge class="uni-badge-left-margin" text="1" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view @click="changeTitle">changeTitle</view>
    <view @click="goTest">测试页</view>
    <div class="ttg-flex">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
  </view>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 200rpx;
  margin-bottom: 50rpx;
  width: 200rpx;
  height: 200rpx;
}
.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
