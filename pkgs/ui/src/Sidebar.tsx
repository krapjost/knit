import clsx from 'clsx'
import { Accessor, For, JSX } from 'solid-js'
import { Button } from './Button'
import { Icon } from './Icon'

type Heading = {
  el: Element
  hasFocus: boolean
}

type propType = JSX.HTMLAttributes<HTMLDivElement> & {
  isSidebarOpen: Accessor<boolean>
  toggleSidebar: () => void
  headings: Heading[] | undefined
}
type Component = (props: propType & { ref?: HTMLDivElement }) => JSX.Element

const Sidebar: Component = (props) => {
  return (
    <div
      class={clsx(
        'flex',
        'flex-col',
        'bg-stone-100',
        'min-w-[280px]',
        'transition-all',
        'ease-in-out',
        'dark:bg-stone-800',
        {
          '-translate-x-full opacity-0 invisible cursor-none': !props
            .isSidebarOpen(),
        },
      )}
    >
      {props.children}
      <div class='flex justify-end p-2'>
        <Button onclick={props.toggleSidebar} size={'icon'}>
          <Icon name='IconLayoutSidebarLeftCollapse' />
        </Button>
      </div>

      <For each={props.headings}>
        {(heading) => {
          const headingClass = clsx('p-2', {
            'bg-neutral-200': heading.hasFocus,
            'bg-stone-100': !heading.hasFocus,
          })

          return <div class={headingClass}>{heading.el.textContent}</div>
        }}
      </For>
    </div>
  )
}

export { Sidebar }
