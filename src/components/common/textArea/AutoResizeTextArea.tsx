// import { useEffect, useRef, TextareaHTMLAttributes } from 'react';

// interface AutoResizeTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
//   onSend: () => void;
// }

// const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ onSend, ...props }) => {
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     const textarea = textareaRef.current;

//     const handleInput = () => {
//       if (textarea) {
//         textarea.style.height = 'auto';
//         textarea.style.height = `${textarea.scrollHeight}px`;

//         if (textarea.scrollHeight > parseInt(getComputedStyle(textarea).maxHeight)) {
//           textarea.style.overflowY = 'scroll';
//         } else {
//           textarea.style.overflowY = 'hidden';
//         }
//       }
//     };

//     textarea?.addEventListener('input', handleInput);
//     return () => textarea?.removeEventListener('input', handleInput);
//   }, []);

//   return (
//     <div className="relative w-full">
//       <textarea
//         ref={textareaRef}
//         className="w-full min-h-[1.5em] max-h-[6em] overflow-y-auto resize-none box-border p-2 pr-10"
//         rows={1}
//         {...props}
//       />
//       <button
//         onClick={onSend}
//         className="absolute right-2 top-5 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded"
//       >
//         전송
//       </button>
//     </div>
//   );
// };

// export default AutoResizeTextarea;
