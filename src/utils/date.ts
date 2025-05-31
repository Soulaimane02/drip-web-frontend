export function formatDate(messageDate: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - messageDate.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays === 0) {
    if (diffInHours < 1) {
      if (diffInMinutes < 1) {
        return `${diffInSeconds} seconds ago`;
      }
      return `${diffInMinutes} minutes ago`;
    }
    return `${diffInHours} hours ago`;
  }

  if (diffInDays === 1) {
    return "Yesterday";
  }

  const day = messageDate.getDate().toString().padStart(2, "0");
  const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
  const year = messageDate.getFullYear();
  
  return `${day}/${month}/${year}`;
}
