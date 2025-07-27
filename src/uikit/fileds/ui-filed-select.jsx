import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Анна Иванова', email: 'anna@example.com' },
  { id: 2, name: 'Петр Петров', email: 'petr@example.com' },
  { id: 3, name: 'Мария Сидорова', email: 'maria@example.com' },
  { id: 4, name: 'Иван Кузнецов', email: 'ivan@example.com' },
  { id: 5, name: 'Елена Попова', email: 'elena@example.com' },
]

export default function PersonSelector() {
  const [selected, setSelected] = useState(people[0])

  return (
    <div className="w-72 mx-auto mt-8">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">
            Выберите пользователя <span className="text-red-500">*</span>
          </Listbox.Label>

          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 px-2 text-left shadow-sm border border-slate-200 outline-0 focus:border-[#235678] focus:ring focus:ring-[#235678]/40 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-sm ring-1 ring-slate-200 focus:outline-none sm:text-sm">
            {people.map((person) => (
              <Listbox.Option
                key={person.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active ? 'bg-[#235678]/10 text-[#235678]' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                    <span className="block text-xs text-gray-500 truncate">
                      {person.email}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

    </div>
  )
}