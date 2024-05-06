import { ComponentPropsWithRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

const PaddingSize = ["sm", "base", "lg"] as const;

type SectionProps = {
  isDarkBg?: boolean;
  paddingSize?: (typeof PaddingSize)[number];
  classNames?: {
    wrapper?: string;
  };
} & ComponentPropsWithRef<"div">;

const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    { children, isDarkBg, className, paddingSize = "base", classNames },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full p-[60px] flex justify-center",
          [isDarkBg && "bg-[#f6f7f8]"],
          [
            paddingSize === "base" && "p-[60px] max-md:p-[30px]",
            paddingSize === "sm" && "p-[30px] max-md:p-[15px]",
            paddingSize === "lg" &&
              "py-[100px] px-[60px] max-md:py-[50px] max-md:px-[30px]",
          ],
          className,
        )}
      >
        <section
          className={cn(
            "w-full max-w-[1280px] flex flex-col gap-8 text-start",
            classNames?.wrapper,
          )}
        >
          {children}
        </section>
      </div>
    );
  },
);

export default Section;
