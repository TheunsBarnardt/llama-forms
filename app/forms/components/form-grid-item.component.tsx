"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Form } from "@/prisma/interfaces";
import { formatDate } from "@/lib/utils";
import { deleteForm, editForm } from "../actions";


export function FormGridItem({ form, onDelete, onEdit }: { form: Form; onDelete: (id: number) => void; onEdit: (form: Form) => void; }) {
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(form.title);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);

  const handleRename = async () => {
    try {
      const updatedForm = { ...form, title: newTitle };
      const result = await editForm(updatedForm);
      if (result && !result.errors) {
        onEdit(result); // Notify parent component to update the list
        setIsRenameDialogOpen(false);
      } else {
        console.error("Error renaming form");
      }
    } catch (error) {
      console.error("Error renaming form:", error);
    }
  };

  const handleRemove = async () => {
    try {
      const result = await deleteForm(form.id);
      if (result && result.success) {
        onDelete(form.id); // Notify parent component to update the list
        setIsRemoveDialogOpen(false);
      } else {
        console.error("Error deleting form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleOpen = () => {
    const url = `/forms/${form.id}`;
    window.open(url);
  };

  const handleOpenNewTab = () => {
    const url = `/forms/${form.id}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      className="max-w-xs shadow-none py-0 w-52 rounded-sm gap-1 cursor-pointer pb-4"

    >
      <CardContent className="p-0 h-40 bg-muted relative">
        <Image
          src={form.thumbnail}
          alt={form.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-sm"
          onClick={handleOpen}
        />
      </CardContent>
      <CardFooter className="flex flex-col px-4">
        <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h2 className="font-semibold text-left">{form.title}</h2>
              </TooltipTrigger>
              <TooltipContent>
                <p>{form.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="horizontal" className="my-2 w-full p-0" />
        </div>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex text-sm text-muted-foreground items-center justify-start">
            {formatDate(form.changeDate)}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
              <DropdownMenuItem onClick={() => setIsRenameDialogOpen(true)}>
                <Pencil className="mr-1" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsRemoveDialogOpen(true)}>
                <Trash2 className="mr-1" /> Remove
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleOpenNewTab}>
                <SquareArrowOutUpRight className="mr-1" /> Open in new tab
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>

      {/* Rename Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
            <DialogDescription>
              Please enter a new name for the form
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="col-span-3"
                spellCheck={true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsRenameDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleRename}>
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Dialog */}
      <Dialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Remove Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this form?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsRemoveDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}