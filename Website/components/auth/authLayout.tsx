import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { BigBrain } from "@/components/icons/BigBrain";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center h-screen bg-light">
      <Card className="w-4/5 h-4/5 flex flex-col md:flex-row">
        <CardBody className="hidden md:flex flex-1 justify-center items-center bg-blue-500 rounded-t-md md:rounded-l-md md:rounded-r-none">
          <BigBrain className="w-11/12 h-11/12 object-fill rounded-md" />
        </CardBody>
        <CardBody className="flex-1 flex flex-col justify-center items-center rounded-b-md md:rounded-b-none md:rounded-r-md">
          {children}
        </CardBody>
      </Card>
    </div>
  );
};
