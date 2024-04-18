import Image from "next/image";
import { StaticImageData } from "next/image";
import { SectionWrapper } from "@/ui/assets/animation/section-wrapper";

interface Props {
  src1: StaticImageData;
  alt1: string;
  src2: StaticImageData;
  alt2: string;
  src3: StaticImageData;
  alt3: string;
  src4: StaticImageData;
  alt4: string;
  src5: StaticImageData;
  alt5: string;
  src6: StaticImageData;
  alt6: string;
  src7: StaticImageData;
  alt7: string;
  src8: StaticImageData;
  alt8: string;
  src9: StaticImageData;
  alt9: string;
  src10: StaticImageData;
  alt10: string;
  src11: StaticImageData;
  alt11: string;
  src12: StaticImageData;
  alt12: string;
  src13: StaticImageData;
  alt13: string;
  src14: StaticImageData;
  alt14: string;
  src15: StaticImageData;
  alt15: string;
  src16: StaticImageData;
  alt16: string;
  src17: StaticImageData;
  alt17: string;
  src18: StaticImageData;
  alt18: string;
}

export function FamilyGallery({ 
  src1, alt1, 
  src2, alt2, 
  src3, alt3, 
  src4, alt4, 
  src5, alt5, 
  src6, alt6, 
  src7, alt7, 
  src8, alt8, 
  src9, alt9, 
  src10, alt10, 
  src11, alt11,
  src12, alt12,
  alt13, alt14,
  alt15, alt16,
  alt17, alt18,
  src13, src14, 
  src15, src16,
  src17, src18,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
      <div className="grid gap-4">
        <SectionWrapper>
        <div className="">
          <Image className=" h-auto max-w-full rounded-lg" src={src1} alt={alt1} layout="responsive" style={{objectFit: "contain"}} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src2} alt={alt2} layout="responsive" />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src3} alt={alt3} layout="responsive" />
        </div>
        </SectionWrapper>
      </div>
      <div className="grid gap-4">
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src4} alt={alt4} layout="responsive" />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src5} alt={alt5} layout="responsive" />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src6} alt={alt6} layout="responsive" />
        </div>
        </SectionWrapper>
      </div>
      <div className="grid gap-4">
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src7} alt={alt7} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src8} alt={alt8} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src9} alt={alt9} />
        </div>
        </SectionWrapper>
      </div>
      <div className="grid gap-4">
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src10} alt={alt10} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src11} alt={alt11} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src12} alt={alt12} />
        </div>
        </SectionWrapper>
      </div>
      <div className="grid gap-4">
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src13} alt={alt13} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src14} alt={alt14} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src15} alt={alt15} />
        </div>
        </SectionWrapper>
      </div>
      <div className="grid gap-4">
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src16} alt={alt16} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src17} alt={alt17} />
        </div>
        </SectionWrapper>
        <SectionWrapper>
        <div>
          <Image className="h-auto max-w-full rounded-lg" src={src18} alt={alt18} />
        </div>
        </SectionWrapper>
      </div>
    </div>
  );
}