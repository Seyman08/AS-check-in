interface Props {
  name: string;
  action: "Check-In" | "Check-Out";
  time: string;
  status: string;
}

export function AttendanceNotification({ name, action, time, status }: Props) {
  return (
    <div>
      <h2>
        {name} performed a {action}
      </h2>
      <p>
        <strong>Time:</strong> {time}
      </p>
      <p>
        <strong>Punctuality:</strong> {status}
      </p>
      <p>💼 Apeke Stitches Staff Attendance System</p>
    </div>
  );
}
