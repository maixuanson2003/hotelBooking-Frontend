"use client";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  className: string;
  isShow: boolean;
  children: ReactNode;
}
const Modal: React.FC<ModalProps> = ({ isShow, children, className }) => {
  if (isShow) {
    return (
      <div className={`w-full  ${className}`}>
        <div className="w-full h-[80%] flex flex-col gap-y-3">{children}</div>
      </div>
    );
  }
};

export default Modal;
