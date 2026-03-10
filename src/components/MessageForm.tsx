import { useState } from "react";
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';
const MessageForm = () => {

   const[message, setMessage]=useState<string>('');
   const[delay, setDelay]=useState<number>(5);
   const [isSending, setisSending] =useState<boolean>(false);
   const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout> | null>(null);
   const [sentMessage, setSentMessage]=useState<string>('');
   const HandleSend = () => {
    setisSending(true)
    const id=setTimeout(() => {
      setSentMessage(message);
      setMessage('');
      setisSending(false);
      
    }, delay * 1000);
    setTimerId(id);
   }

   const HandleCancell = () => {
    if (timerId) {
      clearTimeout(timerId);
      setisSending(false)
    }
   }
  return (
    <div className='max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-sm bg-white space-y-4' >
      <h2 className='text-2xl font-bold text-green-800 bg-blend-color-burn'>DM Delay Button</h2>
      <Textarea
      placeholder='Enter your message here...'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
     />
      
      <Input
        type='number'
        placeholder='Delay In Seconds...'
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        disabled={isSending}/>
      
      {!isSending ? (
        <Button className='w-full' onClick={HandleSend}>
        Sent With Delay
      </Button>):(<Button className='w-full' variant="destructive" onClick={HandleCancell}>
        CancellSending
      </Button>)}
      
      {sentMessage && (
        <div className='bg-green-100 border rounded p-3 text-green-900'>
        <p className='font-semibold'>Message Sent!!</p>
        {sentMessage }
      </div>)}
    </div>
    
  )
}

export default MessageForm
