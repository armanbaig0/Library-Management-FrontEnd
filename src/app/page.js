'use client'
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/lib/features/theme/themeSlice";

export default function Home() {
 const dispatch = useDispatch();
 const theme = useSelector((state) => state.theme.mode);
  return (
    <>
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        padding: '2rem',
      }}
    >
      {/* Theme Toggle */}
      <button onClick={() => dispatch(toggleTheme())}
        className="border  ">
        Theme 
      </button>
      </div>
    </>
      );
}
