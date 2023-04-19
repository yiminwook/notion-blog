import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
}

const IconButton = ({ icon }: IconButtonProps) => {
  return <button className="p-2 bg-black rounded-md hover:bg-gray-700">{icon}</button>;
};

export default IconButton;
