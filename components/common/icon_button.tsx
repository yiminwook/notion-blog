import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
}

const IconButton = ({ icon }: Props) => {
  return <button className="p-2 bg-black rounded-md hover:bg-gray-700">{icon}</button>;
};

export default IconButton;
