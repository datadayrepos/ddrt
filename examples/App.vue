<!--
  * @Date: 2023-05-27 17:21:21
  *
  * @LastEditTime: 2023-09-09 21:36:31
  * @FilePath: \@datadayrepos/ddrt\examples\App.vue
-->
<template>
  <VApp id="app">
    <VContainer>
      <VBtn class="mb-4" color="primary" @click="toggleTheme">
        {{ $vuetify.theme.current.dark ? 'light' : 'dark' }}
      </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('fr')"> set French </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="locale.setLang('en')"> set English </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="setCustom"> set Custom Lang </VBtn>

      <div class="my-4">
        <VBtn-toggle v-model="markdownTheme" color="deep-purple-accent-3" rounded="0" group>
          <VBtn value=""> Global </VBtn>

          <VBtn value="default"> Default </VBtn>

          <VBtn value="github"> Github </VBtn>
        </VBtn-toggle>
      </div>

      <div class="my-4">
        <VBtn-toggle v-model="output" color="deep-purple-accent-3" rounded="0" group>
          <VBtn value="html"> Html </VBtn>

          <VBtn value="json"> Json </VBtn>

          <VBtn value="text"> Text </VBtn>
        </VBtn-toggle>
      </div>

      <VBtn class="mb-4" color="primary" @click="getHTML"> getHTML </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="getJSON"> getJSON </VBtn>

      <VBtn class="mb-4 ms-4" color="primary" @click="getText"> getText </VBtn>

      <div class="my-4">
        <VDialog :width="maxWidth">
          <template #activator="{ props }">
            <VBtn v-bind="props" class="mb-4" color="primary" text="Viewer" />
          </template>

          <VCard>
            <VCardText>
              <Viewer :value="content" />
            </VCardText>
          </VCard>
        </VDialog>
      </div>

      <EditorTiptap
        ref="EditorTiptapRef"
        v-model="content"
        v-model:markdown-theme="markdownTheme"
        label="Title"
        :output="output"
        :hide-toolbar="hideToolbar"
        :disable-toolbar="disableToolbar"
        :outlined="outlined"
        :dense="dense"
        :error-messages="errorMessages"
        rounded
        :max-height="465"
        :max-width="maxWidth"
        :extensions="extensions"
        @change="onChangeEditor"
      />

      <VDivider class="my-4" />

      <JsonEditorVue v-model="content" read-only height="400px" />
      <!-- <VTextarea :value="content" readonly auto-grow /> -->

      <VDivider class="my-4" />

      <EditorTiptap
        v-model:markdown-theme="markdownTheme"
        label="Editor 2"
        :outlined="outlined"
        :dense="dense"
        rounded
        :max-height="465"
        :max-width="maxWidth"
        :extensions="extensions"
      />

      <VDivider class="my-4" />

      <VDivider class="my-4" />

      <CustomLang v-model="customLang" />
    </VContainer>
  </VApp>
</template>

<script setup lang="ts">
import { BaseKit, type EditorTiptapOnChange, Heading, locale } from '@datadayrepos/ddrt'
import JsonEditorVue from 'json-editor-vue'
import { computed, ref, unref } from 'vue'
import { useTheme } from 'vuetify'

import CustomLang from './components/CustomLang.vue'
import preview from './extensions/preview'
import { jsonValue } from './html'

const extensions = [
  preview.configure({ spacer: true }),
  BaseKit.configure({
    placeholder: {
      placeholder: 'Placeholder...'
    }
  }),
  Heading.configure({
    levels: [1, 2, 3, 4]
  })
]

const theme = useTheme()

const EditorTiptapRef = ref<null | Record<string, any>>(null)
const output = ref<'html' | 'json' | 'text'>('html')
const content = ref(jsonValue)
const markdownTheme = ref('')
const outlined = ref(true)
const dense = ref(false)
const editHtml = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
const maxWidth = ref<number>(900)

const customLang = ref({ ...locale.message.en })

// watch(content, val => {
//   console.log('output :>> ', val)
// })

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function setCustom() {
  locale.setMessage('custom', unref(customLang))
  locale.setLang('custom')
}

function onChangeEditor({ editor, output }: EditorTiptapOnChange) {
  console.log('output :>> ', output)
  console.log('output[html] :>> ', editor.getHTML())
  console.log('output[json] :>> ', editor.getJSON())
  console.log('output[text] :>> ', editor.getText())
}

function getHTML() {
  const value = EditorTiptapRef.value?.editor.getHTML()
  console.log('getHTML :>> ', value)
}

function getJSON() {
  const value = EditorTiptapRef.value?.editor.getJSON()
  console.log('getJSON :>> ', value, JSON.stringify(value))
}

function getText() {
  const value = EditorTiptapRef.value?.editor.getText()
  console.log('getText :>> ', value)
}
</script>

<style>
.jse-main {
  max-height: 400px;
}
</style>
