import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Ellipsis,
  Pencil,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FormGridItemProps {
  id: string;
  thumbnail: string;
  title: string;
  icon: IconDefinition;
  createDate: string;
}

export function FormGridItem(prop: FormGridItemProps) {
  return (
    <Card className="max-w-xs shadow-none py-0 w-52 h-64 rounded-sm">
      <CardContent className="p-0 h-40 bg-muted relative">
        <Image
          src={prop.thumbnail}
          alt={prop.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-sm"
        />
        <Separator orientation="horizontal" className="my-2 absolute bottom-0 w-full" />
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          <h2 className="font-semibold text-left">{prop.title}</h2>
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex text-sm text-muted-foreground items-center justify-start">
            {prop.createDate}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
              <DropdownMenuItem>
                <Pencil className="mr-1" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-1" /> Remove
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SquareArrowOutUpRight className="mr-1" /> Open in new tab
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
}