import { useEffect, useRef, useState } from 'react';
import './App.css';
import './loading.css';
function App() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [temp, setTemp] = useState('start chat with me');
  const [loadingState, setLoadingState] = useState('none');

  let inpt = useRef();
  let bodyChat = useRef();

  let handleClick = () => {
    if (inpt.current.value.trim().length > 0) {
      if (temp === 'start chat with me') {
        setTemp('');
      }
      setLoadingState('inline-block');
      setQuestion(inpt.current.value);
    }
  }

  useEffect(() => {
    let getData = async () => {
      await fetch(`http://127.0.0.1:5000/ask?q=${question}`).
        then(res => res.json()).
        then(data => {

          let aldData = [...answers];
          aldData.push(data.answers)
          setAnswers(aldData)
          inpt.current.value = '';
          setLoadingState('none');
        })
    }
    if (question !== '') getData();
  }, [question]);
  useEffect(() => {
    if (answers.length > 0)
      setTemp(answers.map((answer, i) => (
        <div key={i} className="message-text">
          <div className="message-box bo-rad">
            {answer}
          </div>
        </div>
      )));

  }, [answers])

  useEffect(() => {
    bodyChat.current.scrollTop = bodyChat.current.scrollHeight + 500;
  }, [temp, loadingState])

  return (
    <>
      <div className="messenger-box messenger-box-ch main-box">
        <div className="info-chat">
          <h2>Chat GPT Boot</h2>
        </div>

        <div className="body-chat body-chat-mess" ref={bodyChat}>

          {temp}

          <div style={{ display: loadingState }} className="lds-ripple"><div></div><div></div></div>


        </div>


        <hr className="bttm-hr" />
        <div className="send-chat">
          <input ref={inpt} placeholder="Ask me Somthing ..." />
          <div className="icon-send">
            <button className="button-ok" onClick={handleClick} >Send&nbsp;<i className="fa-solid fa-paper-plane"></i></button>
          </div>
        </div>

      </div>
    </>

  );
}

export default App;
