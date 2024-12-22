<!--
  * @Date: 2023-05-11 22:14:19
  *
  * @LastEditTime: 2023-06-13 21:24:28
  * @FilePath: \@datadayrepos/ddrt\examples\components\PreviewActionButton.vue
-->
<template>
  <ActionButton tooltip="Preview" :disabled="disabled">
    <VIcon>{{ `svg:${mdiFileCodeOutline}` }}</VIcon>

    <VDialog v-model="dialog" fullscreen hide-overlay activator="parent">
      <VCard>
        <VToolbar dark color="primary">
          <VBtn icon dark @click="dialog = false">
            <VIcon>{{ `svg:${mdiClose}` }}</VIcon>
          </VBtn>

          <VBtnToggle v-model="markdownTheme" color="deep-purple-accent-3" rounded="0" group>
            <VBtn value=""> Global </VBtn>

            <VBtn value="default"> Default </VBtn>

            <VBtn value="github"> Github </VBtn>

            <VBtn value="maidragon"> Maidragon </VBtn>
          </VBtnToggle>
        </VToolbar>

        <VContainer>
          <VSheet class="mx-auto" :max-width="maxWidth">
            <Viewer :value="editor.getJSON()" :markdown-theme="markdownTheme" />
          </VSheet>
        </VContainer>
      </VCard>
    </VDialog>
  </ActionButton>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { ActionButton } from '@datadayrepos/ddrt'
import { mdiClose, mdiFileCodeOutline } from '@mdi/js'
import { ref } from 'vue'

interface Props {
  editor: Editor
  tooltip?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: undefined,
  disabled: false
})

const markdownTheme = ref('')
const dialog = ref(false)
const maxWidth = ref<number>(900)
</script>
