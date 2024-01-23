import { useState, useEffect, useRef } from "react";
function OTPForm({ length, onOtpsubmit = () => {} }) {
  let [otp, setOtp] = useState(new Array(length).fill(""));
  let inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function handleChange(e, index) {
    let value = e.target.value;
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    let combinedOtp = newOtp.join("");
    if (combinedOtp.length == 4) {
      return onOtpsubmit(combinedOtp);
    }
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  }
  function handleClick(e, index) {
    inputRefs.current[index].setSelectionRange(1, 1);
  }
  function handleKeyDown(e, index) {
    if (e.key == "Backspace") {
      if (index > 0 && otp[index] == "" && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  }
  console.log("input ref", inputRefs);
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            ref={(element) => (inputRefs.current[index] = element)}
            key={index}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onClick={(e) => handleClick(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otpInput"
          ></input>
        );
      })}
    </div>
  );
}

export default OTPForm;
