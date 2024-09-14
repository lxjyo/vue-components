<script setup lang="ts">
import ModalForm, { type IModalFormOkContext } from 'vue-components/ModalForm'
import SearchForm, { SearchFormItem } from 'vue-components/SearchForm'
import { reactive } from 'vue'
import { ref } from 'vue'

const visible = ref(false)
const formData = reactive({
  name: ''
})
const searchForm = reactive({
  name: '',
  value: '',
  value3: '',
  value4: ''
})
const onOk = ({ resolve }: IModalFormOkContext) => {
  setTimeout(() => {
    resolve('操作成功')
  }, 1000)
}
</script>

<template>
  <ModalForm title="弹框表单" v-model:open="visible" :model="formData" @ok="onOk">
    <a-form-item label="表单" name="name" required>
      <a-input v-model:value="formData.name"></a-input>
    </a-form-item>
  </ModalForm>
  <SearchForm :model="searchForm">
    <SearchFormItem label="测试表单1" name="name">
      <a-input v-model:value="searchForm.name"></a-input>
    </SearchFormItem>
    <SearchFormItem label="表单2" name="value">
      <a-input v-model:value="searchForm.value"></a-input>
    </SearchFormItem>
    <SearchFormItem label="测试表单3" name="value3">
      <a-input v-model:value="searchForm.value3"></a-input>
    </SearchFormItem>
    <SearchFormItem label="表单4" name="value4" :span="2">
      <a-input v-model:value="searchForm.value4"></a-input>
    </SearchFormItem>
    <template #extra>
      <a-button type="primary" @click="visible = true">打开弹框表单</a-button>
    </template>
  </SearchForm>
</template>
