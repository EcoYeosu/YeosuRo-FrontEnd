import * as React from "react";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-start text-center overflow-hidden">
      <h1>home</h1>
    </div>
  );
}
