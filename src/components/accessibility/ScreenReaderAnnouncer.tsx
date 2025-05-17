
import React, { useEffect, useState } from 'react';

interface ScreenReaderAnnouncerProps {
  message: string;
}

const ScreenReaderAnnouncer: React.FC<ScreenReaderAnnouncerProps> = ({ message }) => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    if (message && message.trim() !== '') {
      setAnnouncements(prev => [...prev, message]);
    }
  }, [message]);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {announcements.map((announcement, index) => (
        <div key={`${index}-${announcement.substring(0, 10)}`}>
          {announcement}
        </div>
      ))}
    </div>
  );
};

export default ScreenReaderAnnouncer;
