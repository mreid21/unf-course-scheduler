const useTime = () => {
  const formatTime = (time: string) => {
    let hours = parseInt(time.slice(0, 2));
    const minutes = time.slice(3, 5);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${suffix}`;
  };

  const timeToInt = (time: string): number => parseInt(time.replace(':', ''))

  return {
    formatTime,
    timeToInt
  };
};

export default useTime;
