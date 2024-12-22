import type { GeneralOptions } from '@datadayrepos/ddrt'
import { Extension } from '@tiptap/core'

import PreviewActionButton from '../components/PreviewActionButton.vue'

export type PreviewOptions = GeneralOptions<PreviewOptions>

export default Extension.create<PreviewOptions>({
  name: 'preview',
  addOptions() {
    return {
      divider: false,
      spacer: false,
      button: () => ({
        component: PreviewActionButton,
        componentProps: {}
      })
    }
  }
})
