export default function BotMsg(props) {
    const {bodY, namE, timE} = props;
    
    return (
        <div className="chat-start">
            
            <div className="chat-bubble chat-bubble-primary">{bodY} </div>
            <div className="chat-footer ">
                <time className="text-xs opacity-50 ml-2">{timE}</time>
            </div>
        </div>
    )
}

//place-items-start grid-cols-2 auto col-span-1