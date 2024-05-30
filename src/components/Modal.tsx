import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalProp {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onChange: () => void;
}

const Modal: FC<ModalProp> = ({ isOpen, title, children, onChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => onChange()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
