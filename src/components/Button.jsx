import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setButtonPros } from '../features/button/buttonSlice'


export default function Button({
    onClick,overrideProps={}
}) {

    const dispatch = useDispatch();
    const {text,className}= useSelector((state)=>state.button);

    const mergedClassName = `${className} ${overrideProps.className || ""}`
    const mergedText = overrideProps.text || text;
      return (
    <div>
      <button
       className={`${mergedClassName}`}
      >
        {mergedText}
      </button>
    </div>
  )
}
