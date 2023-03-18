export default function Member(props) {
    const {abbr, name, bg, score} = props;

    return (
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className={`flex items-center justify-center h-8 w-8 ${bg} rounded-full`}>
           {abbr}
            </div>
            <div className="ml-2 text-sm font-semibold">{name}</div>
              <div className="flex items-center justify-center  font-semibold  ml-auto text-xs text-white bg-red-500 h-8 w-8 rounded leading-none">
                {score}
              </div>
        </button>
    )
}