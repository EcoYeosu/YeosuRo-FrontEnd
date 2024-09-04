import React, { forwardRef } from "react";
import type { BottomSheetProps as BaseBottomSheetProps } from 'react-spring-bottom-sheet';
import { BottomSheet as BaseBottomSheet } from "react-spring-bottom-sheet";
import { RefHandles } from "react-spring-bottom-sheet/dist/types";

export interface BottomSheetProps extends BaseBottomSheetProps {
  HeaderComponent?: React.ReactNode;
  FooterComponent?: React.ReactNode;
  fixedMaxHeight?: number;
}

// TODO : 추후 옵션 추가 및 수정
export const BottomSheet = forwardRef<RefHandles, BottomSheetProps>(
  (
    { open, onDismiss,fixedMaxHeight, children, ...props }: BottomSheetProps,
    ref,
  ) => {
    return (
      <BaseBottomSheet
        ref={ref}
        open={open}
        onDismiss={onDismiss}
        skipInitialTransition
        snapPoints={({ maxHeight }) => [maxHeight - 100, maxHeight / 2, maxHeight * 0.25]}
        expandOnContentDrag={false}
        {...props}
      >
        {children}
      </BaseBottomSheet>
    );
  },
);
BottomSheet.displayName = 'BottomSheet';