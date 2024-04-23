export const formatDate = (dateToFormat: { seconds: number }) => {
  const formatedDate = new Date(dateToFormat.seconds * 1000);
  const now = new Date(Date.now());

  if (
    now.getFullYear() === formatedDate.getFullYear() &&
    now.getMonth() === formatedDate.getMonth() &&
    now.getDate() === formatedDate.getDate()
  ) {
    return `${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
  } else if (
    now.getFullYear() === formatedDate.getFullYear() &&
    now.getMonth() === formatedDate.getMonth() &&
    now.getDate() === formatedDate.getDate() + 1
  ) {
    return `Hier - ${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
  } else {
    return `${formatedDate.toLocaleDateString()} - ${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
  }
};
