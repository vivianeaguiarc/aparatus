"use client";

import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

export const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(phone);
      } else {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement("textarea");
        textArea.value = phone;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      toast.success("Telefone copiado com sucesso!");
    } catch (error) {
      console.error("Erro ao copiar telefone:", error);
      toast.error("Erro ao copiar telefone");
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <div className="rounded-md border p-2">
          <Phone className="h-4 w-4" />
        </div>
        <span className="text-sm">{phone}</span>
      </div>
      <Button variant="ghost" size="sm" onClick={handleCopy}>
        Copiar
      </Button>
    </div>
  );
};
