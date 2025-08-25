import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme: themeMode } = useContext(ThemeContext);

  return (
    <Sonner
      theme={(themeMode as ToasterProps["theme"]) || "system"}
      className="toaster group"
      position="top-right"
      offset={20}
      gap={12}
      richColors
      closeButton
      visibleToasts={4}
      style={
        {
          "--normal-bg": "hsl(var(--background))",
          "--normal-text": "hsl(var(--foreground))",
          "--normal-border": "hsl(var(--border))",
          "--success-bg": "hsl(142.1 76.2% 36.3%)",
          "--success-text": "hsl(355.7 100% 97.3%)",
          "--error-bg": "hsl(0 84.2% 60.2%)",
          "--error-text": "hsl(0 0% 98%)",
          "--warning-bg": "hsl(38.0 92.0% 50.0%)",
          "--warning-text": "hsl(0 0% 98%)",
          "--info-bg": "hsl(221.2 83.2% 53.3%)",
          "--info-text": "hsl(0 0% 98%)",
        } as React.CSSProperties
      }
      toastOptions={{
        className:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        duration: 4000,
        style: {
          borderRadius: "12px",
          border: "1px solid hsl(var(--border))",
          backdropFilter: "blur(8px)",
          boxShadow:
            "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
