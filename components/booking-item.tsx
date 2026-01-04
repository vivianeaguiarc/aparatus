import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export const BookingItem = () => {
  return (
    <>
      <Card className="flex h-full w-full cursor-pointer flex-row items-center justify-between p-0">
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Badge>Confirmado</Badge>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Corte de cabelo</p>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png" />
              </Avatar>
              <p className="text-sm font-medium">José da Silva</p>
            </div>
          </div>
        </div>
        <div className="flex w-[106px] h-full flex-col items-center justify-center border-l py-3">
          <p className="text-xs capitalize">Fevereiro</p>
          <p className="text-2xl">04</p>
          <p className="text-xs">09:45</p>
        </div>
      </Card>
    </>
  );
};
