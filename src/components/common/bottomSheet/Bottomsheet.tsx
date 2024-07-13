import React, { forwardRef, PropsWithChildren } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";

// TODO : 추후 옵션 추가 및 수정
function Bottomsheet({ children }: PropsWithChildren) {
  return <BottomSheet open>{children}</BottomSheet>;
}

const ForwardedBottomSheet = forwardRef(Bottomsheet);
ForwardedBottomSheet.displayName = "BottomSheet";

export default ForwardedBottomSheet;
