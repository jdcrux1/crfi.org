"use client";

import { useLayoutEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

const galleries = [
  {
    year: "2020",
    title: "CRFU Outreach 2020",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-7/original/img-20200321-111539F43B07CB-AB34-BFBF-0632-B5403319A659.jpg",
    ]
  },
  {
    year: "2015",
    title: "CRFU Outreach 2015",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-665148CF175A-9B39-6785-7C73-FF39D499217E.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-66639CEAB800-883E-2EA2-2850-F033DBFF1ECA.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6688E7204654-EB01-6DE4-24D4-D5EE969EAC87.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-67023B84EACD-92DF-3811-A072-330A7B939EE7.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-67141A816EB4-D34F-1F48-D031-E56171CFB59B.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6765A332A6FF-8DC3-59C5-4F77-1937F917E360.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-67678C6E017F-C932-ADEB-17EF-2CA4130809FE.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-67681090B74F-8580-DD74-DE0F-BEB52C622FD9.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6769069A9E12-1A4D-A94D-1106-0C935C86B0F1.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-677061402D2E-34D3-38E5-8A91-B8574A323DEC.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6776D5A3BF40-4292-55AC-FBCE-63D00BC07229.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6791C7B5B172-2279-57F4-6910-EADC529547E0.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-679953DFFA3B-A81D-6842-7296-E1841DDB3F6F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6820816D09BB-B0A9-5DE1-AB0D-12AD6CD87B68.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6836166B4ABE-9D1A-7691-331D-E21355636773.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-68397FFAED27-1926-6EDE-4B6B-6AA0C75B046F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6858D1306571-8144-2202-D4C2-E8912B496B85.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-687820C123AD-8FDD-4B97-BCC3-006B778EA871.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6886A709C16E-342A-10C5-71ED-7A1262F13F9C.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-6/original/img-6891F35BC22C-DA37-0A00-0C04-355B7E15BF2C.jpg",
    ]
  },
  {
    year: "2014",
    title: "CRFU Outreach 2014",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4753FE83092D-F19A-A2B8-FC2D-62E1F9CCB2BE.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4769E25D043E-F2CE-9885-BDC2-79CE8F412882.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-47723BFE382C-1D3E-CCF8-3C92-618E9A7196EF.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4782BD4D95E9-355D-3184-3CF1-D53C3AEAD95E.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4790CC420B41-9EE9-DFA4-7347-8DD191B5E5C8.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-47929354E7C2-7055-DB1A-95EC-B2D3606C313D.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-481813B8B9A2-B1C1-C897-618B-6D0BC3A168EF.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-482641D5C765-4301-BA4F-BA81-885A540BED59.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4834022EE79E-65D6-CFEB-42B0-34EF672776B3.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4836138B50F0-FAD9-81E4-B498-24E09E357E67.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4903963A5CDE-C1AE-19F9-ED26-6F448397779A.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-490611F922F7-2348-EEDE-9190-CC3C4F66A8BE.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-4927830F9451-8EFC-722A-EC4C-ADF84DB67935.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-497875F55230-5311-269B-9FE3-85C2FE639446.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-49851761794E-7B49-74CB-691D-1F436CA2DE12.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-50502C187693-1CFF-2C98-498C-FA0755F2196C.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-5208CBC087DA-5A15-2145-81A1-BB60E2DCF4F0.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-52130220D2DD-E00F-EBE6-E7FF-C92604F52D88.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-522166D8574B-8B75-7B06-9DDD-19374393B293.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-52266044D5B5-4A4F-C578-7C32-A804E29F6714.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-5/original/img-5237E0549446-4492-9147-F416-A82EF37450D7.jpg",
    ]
  },
  {
    year: "2013",
    title: "CRFU Outreach 2013",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9029DC21FCC9-72CB-1A69-8B94-E8A8D243E389.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9031E7259B99-43A8-6EDE-820F-096533BEF28E.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9035C2622F0B-F0BB-FE57-B049-07A88BED5897.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-90362BEA4C89-15FC-8D09-81A5-8867C3ADD15C.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9040B957A0AE-1EF0-2FE3-98C9-4DA6EB06A96F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-90415F92890A-A9B5-6085-ECBA-61136967311D.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-90457B369F50-1C32-63F8-FEBF-162A9450DAF8.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9048EBD95E11-DD32-46B1-FE7C-7394F850804D.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-905336D0AC3E-D848-2911-5787-E05758BFCF0C.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-90585A3D4FF8-18F2-5151-023C-030B1C508F43.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9064477E1808-BF1D-0096-FEE0-7EB81BF536F8.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9067953C5C91-56B6-306A-F685-324A437DC605.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-910706E58A57-77D8-603B-82E6-B695790FEC58.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9108BE39619A-6DB5-4F1E-4DF1-766B3560D0A7.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-91172287412F-6B8F-A9B2-5327-13A1B113C4F9.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-91291EC47DDB-545E-DF83-3C6D-0AFDF65D7913.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-914661FB5957-902F-BB59-37DA-725BD8724653.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-4/original/img-9166FF30119B-9996-CD15-AAA6-246C4C60F1B3.jpg",
    ]
  },
  {
    year: "2012",
    title: "CRFU Outreach 2012",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-08220A7E53D9-95E6-4BC3-2F13-8BAA51C04BED.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-083545CA47FA-1208-A361-E737-510EE78ED402.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-0837D6D855BA-8EC6-7DB8-61ED-C84C52AE94D2.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-0840EB163C26-0DF3-0AE2-234A-60D00A2F270F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-084855E5946F-7EB7-0C84-B47A-D56CF42DF48E.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-0849FD5BE470-1751-657E-DE1F-23ACCA25459F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-08535C8CD640-EF54-E43B-A9F1-383D65AB501A.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-0862235E7663-ABDB-38E5-B17F-534964E192C4.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-0872D7D62D60-12E8-FA03-E664-69B28F5D7A59.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-087934C28B9A-083F-1576-C6D0-11988967C7E1.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-088883395FA2-DF2A-5425-5711-3F5291B9DCCC.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-08961F7301DC-9F61-8B81-0E03-1B12206E438C.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-089829AE4EB3-8A1E-5555-3871-1094F4B63AF2.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-09109C24672E-CD43-06AE-A85A-CBF0B55B6D90.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-094976AA18BB-9880-FB67-2A55-1F109940A355.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-095247A8BACF-5C45-E0BE-C8F5-02A1592D8A4D.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-0957CD89F020-66A6-E849-DBF5-47DFC63A6F1B.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-09806D5E2011-C85F-AAAD-0F99-BD86934590D9.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-099975599964-5281-9671-2A6D-9D680BD37717.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-10261F73E01C-FFE4-4667-C1D9-32A6FEA079F7.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-1035A3C97CE3-749C-73AA-F67B-E3B848EC036A.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-1036EA244186-828A-D871-293C-D8786E2E714B.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-110058C13C69-F7C9-E30A-84EA-A6837E6BCCA5.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-3/original/img-1131792C6790-2493-8FC0-A4B6-D20991631A78.jpg",
    ]
  },
  {
    year: "2011",
    title: "CRFU Outreach 2011",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0001CD8B0D3F-B150-31F4-5F02-743E2AEBD2D0.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0008743BEAA6-9DDC-7873-35E0-5BA2C7A9B402.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0015773FE6E1-4262-718C-ECF5-B9ECE9977225.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0018D131F0ED-E12C-FADD-A36F-738F749072E3.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0019671BE22A-1889-8802-3D7B-FCDC58A1067F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-00260C2DCC04-E8CB-BF1D-159B-E2ADDB1E779F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0031DC8BE0C5-A97B-550D-B0CF-3A46945E6639.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-00375EEE96E3-7DBD-6929-16D7-0E4F416BF4C0.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-004442BB0D45-22B6-F8A9-31E9-68FFC700EF6C.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0046248FEC0D-3324-3FF4-DB2B-08CFC648DE61.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-00554A7F6F79-82AA-A824-B790-C51BAC840227.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0056D561A0D6-D860-5017-FF94-F841338DB222.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-00625C734952-033E-6E42-2BED-8E722DBD698B.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-006399E9BB31-9E0B-F26A-C0B8-A8474A9B59F4.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0065F0217861-55B1-4A14-C9B3-A9ACE2F1587E.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0066C0397C2D-8324-1FE4-8F43-8403959BFE3A.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0073FFB13C4B-0863-AACD-0AB1-DB282764D3E0.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-009928D51C98-4592-C7F0-E7E1-F6EC6D2344D5.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0127D1D2D068-3C03-9EA7-018E-6779DC9BE85F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-0132F0C36293-FA66-16B9-E706-72E0D4E6AF80.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-2/original/img-01790F5E62BD-90D5-463E-A85C-8E8304E25801.jpg",
    ]
  },
  {
    year: "2010",
    title: "CRFU Outreach 2010",
    images: [
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0023CC209543-B454-93DE-2C47-B934A6E36163.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0025AB852F9E-CCB5-44D7-18E5-8751F2F1300A.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-004004761707-CF1C-74EC-6C7C-81767538B8E3.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0042CCF97943-0992-C0C5-4043-6D453757BEA9.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0046D5F60B00-0DB6-4CE4-603B-965F35BFAED4.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-00537D4247A4-26EC-F5B5-F8F3-3FDAD2FA1034.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-005556E22510-8EE0-8E11-8FAD-D79A4024164E.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0059596216E5-96C5-795D-5DAE-666B1B65537F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0087A3DE40B7-82D0-D543-1BC5-FEC458B6D4EF.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-01119F5762E0-5ECA-69D9-7CB8-19B5E3772C6F.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-01313D972133-9E45-63F1-9956-8CE91B92B079.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0147E728B0ED-BCB1-8813-A7C8-6736EB650AF7.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-036653E9C245-E5EC-8B6D-612D-477E54C4DAC5.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-03704000879E-8C8D-04BF-3C6F-1BD2F45A3882.jpg",
      "https://www.crfing.org/images/com_osgallery/gal-1/original/img-0396A5B963FC-6B56-9A45-50D8-6DAA38D9AD73.jpg",
    ]
  }
];

export default function EventGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<{ galleryIndex: number, imageIndex: number } | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Hero staggered text reveal
      gsap.fromTo('.stagger-text-in', 
        { y: 150, opacity: 0, rotateX: -30 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          duration: 1.4, 
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2
        }
      );

      // Section Text Reveal on Scroll
      const textBlocks = gsap.utils.toArray('.gsap-text-reveal');
      textBlocks.forEach((block: any) => {
         gsap.fromTo(block, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
            }
          }
        );
      });

      // Timeline nodes pop in
      const nodes = gsap.utils.toArray('.timeline-node');
      nodes.forEach((node: any) => {
         gsap.fromTo(node,
           { scale: 0, opacity: 0 },
           {
             scale: 1,
             opacity: 1,
             duration: 0.8,
             ease: "back.out(1.7)",
             scrollTrigger: {
               trigger: node,
               start: "top 80%",
             }
           }
         )
      });
      
    }, containerRef);

    return () => ctx.revert(); 
  }, []);

  // Simple Lightbox handlers
  const openLightbox = (galleryIndex: number, imageIndex: number) => {
    setActiveImage({ galleryIndex, imageIndex });
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    setActiveImage(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeImage) return;
    const { galleryIndex, imageIndex } = activeImage;
    const currentGallery = galleries[galleryIndex];
    if (imageIndex < currentGallery.images.length - 1) {
      setActiveImage({ galleryIndex, imageIndex: imageIndex + 1 });
    } else {
      // Loop back to start
      setActiveImage({ galleryIndex, imageIndex: 0 });
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeImage) return;
    const { galleryIndex, imageIndex } = activeImage;
    const currentGallery = galleries[galleryIndex];
    if (imageIndex > 0) {
      setActiveImage({ galleryIndex, imageIndex: imageIndex - 1 });
    } else {
      // Loop to end
      setActiveImage({ galleryIndex, imageIndex: currentGallery.images.length - 1 });
    }
  };

  // Draggable Carousel Logic
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    const ele = e.currentTarget;
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
    ele.dataset.pos = JSON.stringify({
      left: ele.scrollLeft,
      x: e.clientX,
    });
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const ele = e.currentTarget;
    if (ele.style.cursor !== 'grabbing') return;
    const pos = JSON.parse(ele.dataset.pos || '{}');
    const dx = e.clientX - pos.x;
    ele.scrollLeft = pos.left - dx;
  };

  const handleMouseUp = (e: ReactMouseEvent<HTMLDivElement>) => {
    const ele = e.currentTarget;
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
  };

  return (
    <main ref={containerRef} style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 'var(--space-16)', position: 'relative' }}>
      
      {/* Lightbox Modal */}
      {activeImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--space-4)' }} onClick={closeLightbox}>
           
           {/* Image Container */}
           <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={(e) => e.stopPropagation()}>
             <img 
               src={galleries[activeImage.galleryIndex].images[activeImage.imageIndex]} 
               alt="Fullscreen event image" 
               style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 50px rgba(0,0,0,0.5)', borderRadius: '4px' }} 
             />
             
             {/* Prev Arrow */}
             <button onClick={prevImage} style={{ position: 'absolute', left: '-5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: '3rem', cursor: 'pointer', opacity: 0.7, padding: '1rem' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
               &#10094;
             </button>
             
             {/* Next Arrow */}
             <button onClick={nextImage} style={{ position: 'absolute', right: '-5rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: '3rem', cursor: 'pointer', opacity: 0.7, padding: '1rem' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}>
               &#10095;
             </button>

             {/* Indicator */}
             <div style={{ position: 'absolute', bottom: '-3rem', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '1rem', letterSpacing: '0.1em' }}>
               {activeImage.imageIndex + 1} / {galleries[activeImage.galleryIndex].images.length}
             </div>
           </div>

           {/* Close Button */}
           <div style={{ position: 'absolute', top: '2rem', right: '3rem', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', opacity: 0.7, padding: '1rem', minWidth: '48px', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'} onClick={closeLightbox}>&times;</div>
        </div>
      )}

      {/* ------------------------------------- */}
      {/* Page Hero (Compact)                   */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ 
        minHeight: '40vh', 
        display: 'flex', 
        alignItems: 'flex-end', 
        position: 'relative',
        overflow: 'hidden'
      }}>
         <div className="grid-12" style={{ width: '100%' }}>
            <div className="col-span-full md-col-start-2 md-col-span-10" >
               <h1 style={{ overflow: 'hidden', margin: 0, lineHeight: 0.9, fontSize: 'clamp(3rem, 8vw, 8rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.02em', perspective: '1000px' }}>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-text)', transformOrigin: 'top center' }}>EVENT</span>
                 <span className="stagger-text-in" style={{ display: 'block', color: 'var(--color-accent)', transformOrigin: 'top center' }}>GALLERY</span>
               </h1>
            </div>
         </div>
      </section>

      {/* ------------------------------------- */}
      {/* Timeline Layout                       */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ position: 'relative', paddingBottom: '20vh' }}>
         <style>{`
           /* Hide scrollbar for carousels but allow scrolling */
           .gallery-carousel::-webkit-scrollbar {
             height: 4px;
           }
           .gallery-carousel::-webkit-scrollbar-track {
             background: rgba(255,255,255,0.05);
             border-radius: 4px;
           }
           .gallery-carousel::-webkit-scrollbar-thumb {
             background: var(--color-accent);
             border-radius: 4px;
           }
           .gallery-carousel {
             scrollbar-width: thin;
             scrollbar-color: var(--color-accent) rgba(255,255,255,0.05);
           }
           .carousel-item {
             flex-shrink: 0;
             transition: filter 0.3s ease, transform 0.3s ease;
             filter: grayscale(40%) brightness(0.8);
           }
           .carousel-item:hover {
             filter: grayscale(0%) brightness(1);
           }
         `}</style>

         {/* Central Timeline Spine */}
         <div style={{ position: 'absolute', left: '10%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)', zIndex: 0 }}></div>

         <div style={{ display: 'flex', flexDirection: 'column', gap: '15vh', position: 'relative', zIndex: 1 }}>
            {galleries.map((gallery, galleryIndex) => (
              <div key={gallery.year} style={{ position: 'relative' }}>
                 
                 {/* Timeline Node & Year */}
                 <div style={{ position: 'absolute', left: '10%', top: '0', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div className="timeline-node" style={{ width: '16px', height: '16px', background: 'var(--color-accent)', borderRadius: '50%', boxShadow: '0 0 20px var(--color-accent)' }}></div>
                    <h2 className="gsap-text-reveal" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 800, margin: 0, color: 'var(--color-text)', lineHeight: 1 }}>{gallery.year}</h2>
                 </div>

                 {/* Content Offset */}
                 <div style={{ marginLeft: 'max(20%, 120px)', paddingTop: 'var(--space-6)' }}>
                    <div className="gsap-text-reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                       <h3 style={{ color: 'var(--color-text-muted)', margin: 0, fontSize: '1.25rem', fontWeight: 300, letterSpacing: '0.05em' }}>
                          {gallery.title}
                       </h3>
                       <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>Swipe or drag to scroll</span>
                          <span style={{ fontSize: '1.2rem' }}>&rarr;</span>
                       </div>
                    </div>
                    
                    {/* Horizontal Carousel */}
                    <div 
                       className="gallery-carousel gsap-text-reveal" 
                       style={{ 
                         display: 'flex', 
                         gap: 'var(--space-4)', 
                         overflowX: 'auto', 
                         paddingBottom: 'var(--space-4)',
                         width: '100%',
                         cursor: 'grab'
                       }}
                       onMouseDown={handleMouseDown}
                       onMouseMove={handleMouseMove}
                       onMouseUp={handleMouseUp}
                       onMouseLeave={handleMouseUp}
                    >
                       {gallery.images.map((img, imageIndex) => (
                         <div 
                           key={imageIndex} 
                           className="carousel-item"
                           style={{
                              width: 'clamp(280px, 30vw, 400px)',
                              aspectRatio: '3/2',
                              position: 'relative',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              background: 'rgba(255,255,255,0.02)',
                              cursor: 'pointer' // Can still click to open
                           }}
                           onClick={(e) => {
                             // Only open if it was a pure click, not a drag release.
                             // A simple heuristic is: if cursor is grab, user is not dragging actively.
                             openLightbox(galleryIndex, imageIndex);
                           }}
                         >
                            <img 
                              src={img} 
                              alt={`${gallery.title} photo ${imageIndex + 1}`} 
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
                            />
                            {/* Hover Overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'flex-end', padding: '1rem' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                               <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Click to Enlarge</span>
                            </div>
                         </div>
                       ))}
                       {/* End Padding to allow last item to clear scroll area cleanly */}
                       <div style={{ paddingRight: '10vw', flexShrink: 0 }}></div>
                    </div>

                 </div>
              </div>
            ))}
         </div>

      </section>

      {/* ------------------------------------- */}
      {/* Navigation CTA (Next Page)          */}
      {/* ------------------------------------- */}
      <section className="section-padding" style={{ paddingBottom: 'var(--space-16)', textAlign: 'center' }}>
         <h3 className="text-h3 gsap-text-reveal" style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Next</h3>
         <Link href="/devotionals" style={{ textDecoration: 'none' }}>
           <h2 className="text-h1 gsap-text-reveal" style={{ color: 'var(--color-text)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
             DEVOTIONALS
           </h2>
         </Link>
      </section>

    </main>
  );
}

