import type { Extensions } from '@tiptap/core'
import type { App, Plugin } from 'vue'

import EditorTiptap from './components/EditorTiptap.vue'
import Viewer from './components/Viewer.vue'
import { createContext, useContext } from './hooks'
import locale, { en, zhHans } from './locales'

interface InstallationOptions {
  lang?: string
  markdownTheme?: string
  components?: Record<string, any>
  extensions?: Extensions
}

const createTipTap = (opts: InstallationOptions): Plugin => {
  const install: Plugin = (app: App): void => {
    const { lang, markdownTheme, components = {}, extensions } = opts || {}

    if (lang) locale.setLang(lang)

    Object.keys(components).forEach(key => app.component(key, components[key]))

    createContext({
      defaultLang: lang,
      defaultMarkdownTheme: markdownTheme,
      extensions
    })
  }

  return install
}

export * from './extensions'
export type {
  ButtonView,
  ButtonViewReturnComponentProps,
  Editor,
  EditorTiptapOnChange,
  GeneralOptions,
  JSONContent
} from './type'
export { createTipTap, EditorTiptap, Viewer }
export { useContext }
export { en, locale, zhHans }
export type { InstallationOptions }

declare module 'vue' {
  export interface GlobalComponents {
    EditorTiptap: typeof EditorTiptap
    Viewer: typeof Viewer
  }
}
