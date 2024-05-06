import * as React from "react";

import { AloneSection } from "@components/module/home/AloneSection";
import { IntroduceSection } from "@components/module/home/IntroduceSection";
import { NewsSection } from "@components/module/home/NewsSection";
import { RecruitSection } from "@components/module/home/RecruitSection";
import { RoadmapSection } from "@components/module/home/RoadmapSection";

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function HomePage() {
  return (
    <section className="w-full relative flex flex-col items-center justify-center text-center flex-1">
      <IntroduceSection />
      <NewsSection />
      {/*<RequestSection />*/}
      <RoadmapSection />
      <AloneSection />
      <RecruitSection />
    </section>
  );
}
