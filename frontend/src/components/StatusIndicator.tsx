import { Mic, Loader2, Volume2, MicOff } from 'lucide-react';
import { Status } from '../types';

interface Props {
  status: Status;
}

export function StatusIndicator({ status }: Props) {
  const configs = {
    idle: { icon: <MicOff className="w-5 h-5" />, text: 'Ready', color: 'text-gray-400' },
    recording: { icon: <Mic className="w-5 h-5 animate-pulse" />, text: 'Listening...', color: 'text-red-400' },
    processing: { icon: <Loader2 className="w-5 h-5 animate-spin" />, text: 'Thinking...', color: 'text-blue-400' },
    speaking: { icon: <Volume2 className="w-5 h-5" />, text: 'Speaking...', color: 'text-green-400' },
  };

  const { icon, text, color } = configs[status];

  return (
    <div className={`flex items-center gap-2 ${color}`}>
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
