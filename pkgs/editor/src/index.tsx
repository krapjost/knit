import './editor.css'
import type { Editor } from '@tiptap/core'
import clsx from 'clsx'
import { createEditor } from 'solid-tiptap'
import { TextArea } from 'ui'
import { SidebarProvider } from './features/sidebar'

import { createContext, Show, useContext } from 'solid-js'
import { DocumentManagerProvider, useDocumentManager } from './documentManager'
import { Features, useUserConfig } from './features'
import extensions from './tiptap_extensions'

const KnotEditorContext = createContext<{
  editor: Editor
  editorRef: HTMLDivElement
}>()

export const useKnotEditor = () => {
  const context = useContext(KnotEditorContext)
  console.trace('useKnotEditor', context)
  if (!context) {
    throw new Error('useKnotEditor must be used within KnotEditorProvider')
  }
  return context
}

const KnotEditorProvider = (props: { children: any }) => {
  let editorRef: HTMLDivElement
  const editorStyle = clsx(
    'prose dark:prose-invert max-w-none lg:prose-md md:max-w-4xl leading-relaxed text-editorFg outline-transparent w-full min-h-full h-fit p-editor prose-p:m-0 focus:outline-none',
  )
  const { getAllHeadings } = useDocumentManager()

  const editor = createEditor(() => ({
    element: editorRef,
    extensions: extensions,
    editorProps: {
      attributes: {
        id: 'document',
        class: editorStyle,
      },
    },
    onTransaction({ editor }) {
      getAllHeadings(editor.state)
        .toggleLastHeadingFocus()
        .setSearchIndex()
    },
  }))

  return (
    <>
      <Show when={editor()}>
        <KnotEditorContext.Provider
          value={{
            editor: editor()!,
            editorRef: editorRef!,
          }}
        >
          {props.children}
        </KnotEditorContext.Provider>
      </Show>
      <TextArea ref={editorRef!} />
    </>
  )
}

export function KnotEditor() {
  const enabledFeatures = useUserConfig().filter((feature) => feature.enabled)
  const sidebarEnabled = enabledFeatures.some((feature) =>
    feature.name === 'sidebar'
  )

  return (
    <SidebarProvider when={sidebarEnabled}>
      <DocumentManagerProvider>
        <KnotEditorProvider>
          <Features features={enabledFeatures} />
        </KnotEditorProvider>
      </DocumentManagerProvider>
    </SidebarProvider>
  )
}
