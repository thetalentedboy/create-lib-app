# Input 组件

常用的输入框组件。

## 基本使用

:::demo

```vue

<template>
  <div id="input"></div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { Input } from 'sdk';

  onMounted(() => {
    Input('input');
  });
</script>
<style>
  @import "sdk.css";
</style>
```

:::

## Props

| 名称          | 类型       | 默认值       | 描述        |
|-------------|----------|-----------|-----------|
| id          | `string` | `'input'` | 输入框根目录 ID |
| placeholder | `string` | `'请输入'`   | 输入框占位文本   |


