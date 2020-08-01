import React, { PropsWithChildren } from 'react'

export interface Props {
  value: boolean
  setValue: (v: boolean) => void
}

export const Modal = ({ value, setValue, children }: PropsWithChildren<Props>) => {
  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 z-40 ${value ? '' : 'pointer-events-none'}`}>
      <div
        className={`bg-white bg-opacity-85 bottom-0 left-0 right-0 top-0 absolute transition-opacity duration-500 ease-out ${value ? 'opacity-75' : 'opacity-0'}`}
        onClick={() => setValue(false)}
      />
      <div
        className="bg-white absolute transition-all duration-200 ease-out border-gray-200 bottom-0 left-0 right-0 border-t"
        style={value ? {} : { transform: 'translateY(100%)' }}
      >
        {children}
      </div>
    </div>
  )
}
