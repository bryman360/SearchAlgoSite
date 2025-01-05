import { Fragment, MouseEventHandler } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function AlgoDropdown( { options, algoChoice, handleAlgoSelect, playing } : {options : Array<{algorithmName: string, algorithmStep: Function}>, algoChoice: number, handleAlgoSelect: Function, playing: boolean } ) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {options[algoChoice].algorithmName}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>
      {!playing ? (
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-middle rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((option: {algorithmName: string, algorithmStep: Function}, index)=>{
                // @ts-ignore: Arrow function works for onClick
              return <MenuItem key={option.algorithmName} onClick={()=>handleAlgoSelect(index)}>
                {({ focus }) => (
                  <a
                    href="#"
                    className={classNames(
                      focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {option.algorithmName}
                  </a>
                )}
              </MenuItem>
              })}
              
            </div>
          </MenuItems>
        </Transition>
      ) : <></>}
    </Menu>
  )
}
