import React from "react";

 function Button(
  {
    children,
    type='button',
    className="",
    ...props
  },
  ref
){
  return(
    <button
      className={`${className} transition-all duration-200 !rounded-[10px] py-2 px-3 !text-[14px]`}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button