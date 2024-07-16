
export default function Tag({ word, words, wordClick }) {
    return (
        <span
        // key={index}
        onClick={() => wordClick(word)}
        className={`${
            words.includes(word)
                ? "bg-blue-200"
                : "bg-gray-200"
        } rounded-3xl w-fit px-5 py-2 mx-1 my-2 cursor-pointer transition-all duration-300`}
    >
        {word}
    </span>
    )
} 