<script setup lang="ts">
import { ref, reactive } from 'vue'
import ModalForm from '@vue/ant-components/ModalForm'
const openModal = ref(false)
const formData = reactive({
  name: ''
})
const onOk = ({ resolve }: { resolve: Function }) => {
  setTimeout(() => {
    // 模拟提交成功
    resolve('提交成功！')
  }, 1000)
}
</script>

<template>
  <a-button type="primary" @click="openModal = true">打开模态框</a-button>
  <ModalForm title="表单弹框" v-bind="args" v-model:open="openModal" :model="formData" @ok="onOk">
    <a-form-item label="姓名" name="name">
      <a-input v-model:value="formData.name" placeholder="请输入姓名" />
    </a-form-item>
  </ModalForm>
</template>
