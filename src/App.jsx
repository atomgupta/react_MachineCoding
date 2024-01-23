import { useState } from "react";
import "./App.css";
import OTPForm from "./components/OTPForm";

function App() {
  let [phoneNumber, setPhoneNumber] = useState("4563245666");
  let [showOTPForm, setShowOTPForm] = useState(true);
  function handleChange(e) {
    setPhoneNumber(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const regex = /[^0-9]/g;
    console.log(typeof regex);
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      return alert("invalid number");
    }
    setShowOTPForm(true);
  }
  function onOtpsubmit(otp) {
    console.log("combined otp iss", otp);
  }
  return (
    <>
      <div className="App">
        {!showOTPForm ? (
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="enter phone number"
            ></input>
            <button type="submit">submit</button>
          </form>
        ) : (
          <div>
            <h4>Enter the otp sent to {phoneNumber}</h4>
            <OTPForm length={4} onOtpsubmit={onOtpsubmit} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
