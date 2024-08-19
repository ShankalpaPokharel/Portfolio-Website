import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { RiSettings5Fill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa6";

// Extend the Dracula theme
const CustomDraculaTheme = {
  ...dracula,
  'pre[class*="language-"]': {
    ...dracula['pre[class*="language-"]'],
    margin: "0", 
    padding: "0", 
    backgroundColor: "#1d1e22", 
  },
  'code[class*="language-"]': {
    ...dracula['code[class*="language-"]'],
    backgroundColor: "#1d1e22",
  },
};

const CodeBlock = ({
  text,
  language,
  code,
}: {
  text: string;
  language: string;
  code: any;
}) => {
  return (
    <div className="w-[350px] rounded-md bg-[#1d1e22] p-2 shadow-2xl">
      <div className="flex justify-between">
        <div className="flex gap-1">
          <RiSettings5Fill className="text-[#4c4f5a]" />
          <span className="text-[13px] font-extrabold tracking-widest text-[#c5c8d4]">
            {text}
          </span>
        </div>
        <FaChevronDown className="text-[#4c4f5a]" />
      </div>

      <div className="max-h-full w-full text-xs">
        <SyntaxHighlighter
          language={language}
          style={CustomDraculaTheme}
          wrapLongLines={true}
          showInlineLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
