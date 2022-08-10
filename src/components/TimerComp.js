import { useTimer } from "react-timer-hook";

export default function MyTimer({ expiryTimestamp, otpExpire }) {
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => console.warn("onExpire called"),
    });
  if (!isRunning) {
    otpExpire(true);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="text-slate-500">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
