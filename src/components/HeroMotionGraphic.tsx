import robotImg    from "@/assets/images/case-study/motion graphic/robot.png";
import phoneImg    from "@/assets/images/case-study/motion graphic/phone.png";
import textImg     from "@/assets/images/case-study/motion graphic/text.png";
import messageImg  from "@/assets/images/case-study/motion graphic/message.png";
import aiImg       from "@/assets/images/case-study/motion graphic/ai.png";
import priceTagImg from "@/assets/images/case-study/motion graphic/price tag.png";

/*
  Inner wrapper (280×340) is centered in the outer container.
  Robot + phone are positioned INSIDE the wrapper.
  All floating icons are positioned RELATIVE to the wrapper with
  negative offsets, so they always sit adjacent to the robot
  regardless of viewport / parent transforms.

  Visual result:

       [badge]  [text-bubble]
  [msg]
  [ai]    ROBOT
          PHONE
*/

export function HeroMotionGraphic() {
  return (
    /* outer shell — gives overall dimensions to the grid column */
    <div className="relative h-[420px] w-[420px] select-none">

      {/* inner pivot: tightly wraps robot + phone, all icons offset from here */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ position: "absolute", width: 270, height: 340 }}
      >
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 left-1/2 h-28 w-56 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
        />

        {/* phone — bottom of inner wrapper */}
   
        <img
          src={phoneImg}
          alt=""
          className="pointer-events-none absolute max-w-none drop-shadow-xl"
          style={{
            bottom: -50,
            right: "-30%",
            width: 460,
            transform: "translateX(-50%)",
            animation:
              "hero-drop-in 1.0s ease-out 0.05s both, hero-float-d 5s ease-in-out 1.2s infinite",
          }}
        />

        {/* robot — sits on phone */}
        <img
          src={robotImg}
          alt="AI Robot"
          className="pointer-events-none absolute object-contain max-w-none drop-shadow-2xl"
          style={{
            bottom: 75,
            right: "-40%",
            width: 520,
            transform: "translateX(-50%)",
            animation:
              "hero-drop-in 1.05s ease-out 0s both, hero-float-d 5s ease-in-out 1.2s infinite",
          }}
        />

        {/* ── floating icons, offset OUTSIDE the inner wrapper ── */}

        {/* text bubble — top-right of robot */}
        <img
          src={textImg}
          alt="Text"
          className="pointer-events-none absolute max-w-none object-contain drop-shadow-lg"
          style={{
            top: "26%",
            right: -70,
            width: 250,
            animation:
              "hero-drop-in 0.85s ease-out 0.3s both, hero-float-b 3.4s ease-in-out 1.0s infinite",
          }}
        />
             {/* message — left side, robot chest height */}
        <img
          src={messageImg}
          alt="Message"
          className="pointer-events-none absolute max-w-none object-contain drop-shadow-lg"
          style={{
            top: "55%",
            right: 10,
            width: 100,
            animation:
              "hero-drop-in 0.85s ease-out 0.45s both, hero-float-a 3.0s ease-in-out 1.15s infinite",
          }}
        />


        {/* badge — top, above robot head */}
        <img
             src={aiImg}
          alt="Badge"
          className="pointer-events-none absolute object-contain drop-shadow-lg"
          style={{
            top: "42%",
            left: "-28%",
            width: 130,
            transform: "translateX(-50%)",
            animation:
              "hero-drop-in 0.85s ease-out 0.75s both, hero-float-a 3.8s ease-in-out 1.5s infinite",
          }}
        />

        {/* message — left side, robot chest height */}
        <img
          src={messageImg}
          alt="Message"
          className="pointer-events-none absolute object-contain drop-shadow-lg"
          style={{
            top: "40%",
            left: -16,
            width: 100,
            animation:
              "hero-drop-in 0.85s ease-out 0.45s both, hero-float-a 3.0s ease-in-out 1.15s infinite",
          }}
        />

        {/* AI brain — left side, below message */}
        <img
          src={messageImg}
          alt="AI"
          className="pointer-events-none absolute object-contain drop-shadow-lg"
          style={{
            top: "58%",
            left: -50,
            width: 100,
            animation:
              "hero-drop-in 0.85s ease-out 0.6s both, hero-float-c 2.8s ease-in-out 1.3s infinite",
          }}
        />
      </div>
    </div>
  );
}
