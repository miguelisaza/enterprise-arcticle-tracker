function Alert({ message, status, className }) {
  const statusColor = status === 'error' ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500';

  return (
    <div className={`rounded-md py-2 px-4 text-center border ${statusColor} ${className}`}>
      {message}
    </div>
  );
}

export default Alert;
