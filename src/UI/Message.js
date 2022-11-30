import { XCircle, CheckCircle } from "react-bootstrap-icons";

const Message = (props) => {
    return (
        <div className='z-50 flex items-center justify-start m-auto my-3'>
            {props.type==="success" && <CheckCircle className="w-8 h-8 text-emerald-500 mr-2"/>}
            {props.type==="error" && <XCircle className="w-8 h-8 text-rose-500 mr-2"/>}
            <p className={`text-sm font-semibold ${props.type==="error" ? "text-rose-500" : "text-emerald-500"}`}>{props.message}</p>
        </div>
    )
}

export default Message;