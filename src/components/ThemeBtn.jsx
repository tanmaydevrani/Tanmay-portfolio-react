import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

export default function ThemeBtn() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.theme.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[var(--fill-tertiary)] active:scale-90"
    >
      {theme === "light" ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" fill="var(--label)">
          <path d="M22.692,12.514c-.203-.086-.436-.027-.576,.14-1.086,1.298-2.877,1.902-5.637,1.902-4.998,0-7.037-2.038-7.037-7.033,0-2.694,.621-4.538,1.899-5.638,.165-.142,.219-.374,.134-.575-.086-.2-.293-.313-.507-.302C5.285,1.548,1,6.263,1,11.976c0,6.075,4.945,11.019,11.023,11.019,5.721,0,10.439-4.287,10.975-9.973,.021-.218-.104-.424-.306-.508Zm-10.669,9.48c-5.527,0-10.023-4.494-10.023-10.019C2,7.241,5.236,3.261,9.721,2.222c-.858,1.28-1.278,3.03-1.278,5.301,0,7.12,4.295,8.033,8.037,8.033,2.314,0,4.038-.406,5.301-1.263-1.046,4.475-5.024,7.701-9.757,7.701Z"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" fill="var(--label)">
          <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm0-9c-2.21,0-4,1.79-4,4s1.79,4,4,4,4-1.79,4-4-1.79-4-4-4ZM12.5,0h-1V5h1V0Zm0,19h-1v5h1v-5Zm-7.5-7.5H0v1H5v-1Zm19,0h-5v1h5v-1Zm-3.16-7.63l-.71-.71-3.54,3.54,.71,.71,3.54-3.54ZM7.4,17.3l-.71-.71-3.54,3.54,.71,.71,3.54-3.54Zm0-10.61L3.87,3.16l-.71,.71,3.54,3.54,.71-.71Zm13.44,13.44l-3.54-3.54-.71,.71,3.54,3.54,.71-.71Z"/>
        </svg>
      )}
    </button>
  );
}
