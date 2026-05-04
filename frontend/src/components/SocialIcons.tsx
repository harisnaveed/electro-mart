import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function SocialIcons() {
  const icons = [
    {
      icon: faFacebookF,
      hover:
        "group-hover:text-blue-500 group-hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.9)] group-hover:drop-shadow-[0_0_14px_rgba(59,130,246,0.7)] group-hover:drop-shadow-[0_0_24px_rgba(59,130,246,0.5)]",
    },
    {
      icon: faTwitter,
      hover:
        "group-hover:text-sky-400 group-hover:drop-shadow-[0_0_6px_rgba(56,189,248,0.9)] group-hover:drop-shadow-[0_0_14px_rgba(56,189,248,0.7)] group-hover:drop-shadow-[0_0_24px_rgba(56,189,248,0.5)]",
    },
    {
      icon: faInstagram,
      hover:
        "group-hover:text-pink-500 group-hover:drop-shadow-[0_0_6px_rgba(236,72,153,0.9)] group-hover:drop-shadow-[0_0_14px_rgba(236,72,153,0.7)] group-hover:drop-shadow-[0_0_24px_rgba(236,72,153,0.5)]",
    },
    {
      icon: faLinkedinIn,
      hover:
        "group-hover:text-blue-600 group-hover:drop-shadow-[0_0_6px_rgba(37,99,235,0.9)] group-hover:drop-shadow-[0_0_14px_rgba(37,99,235,0.7)] group-hover:drop-shadow-[0_0_24px_rgba(37,99,235,0.5)]",
    },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {icons.map((item, i) => (
        <div
          key={i}
          className="
            group w-12 h-12 flex items-center justify-center
            rounded-full cursor-pointer
            
            bg-inherit
            
            /* Neumorphism (raised) */
            shadow-[4px_4px_10px_rgba(0,0,0,0.25),-4px_-4px_10px_rgba(255,255,255,0.15)]
            
            transition-all duration-300
            
            /* Hover press effect */
            hover:shadow-[inset_4px_4px_8px_#c8d0d8,inset_-4px_-4px_8px_#ffffff]
            dark:hover:shadow-[inset_3px_3px_6px_#020617,inset_-3px_-3px_6px_#334155]
            
            hover:-translate-y-1
            active:scale-95
          "
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={`
              text-gray-600 dark:text-gray-400
              transition-all duration-300
              
              ${item.hover}
            `}
          />
        </div>
      ))}
    </div>
  );
}
