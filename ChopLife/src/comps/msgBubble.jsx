import { useEffect, useRef } from "react";
import CreateMsg from "./createMsg";
import BotMsg from "./botMsg";

export default function MsgBubble(props) {
        const { messages } = props;

        const messagesEndRef = useRef(null);

         const msg = messages.map(message => {

            if (message.namE === 'chatBot') {
                return (
                    <BotMsg bodY={message.bodY} timE={message.timE}/>
                )
            } else {
                return (
                    <CreateMsg key={message.namE}  namE={message.namE} timE={message.timE} bodY={message.bodY} statuS={message.statuS}/>
                    )
            }
        })

        useEffect(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }, [msg]);

        

    return (
        <div className="w-ful p-5 relative" style={{ overflowY: 'scroll', height: '83.33vh' ,}}>
            {msg}
            <div ref={messagesEndRef} />
        </div> 
    )
}