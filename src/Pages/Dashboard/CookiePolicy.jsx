import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";

const CookiePolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const cookie = {
    description:
      "Tradcouples Matchmaking Services stands at the forefront of sophisticated matchmaking, where accomplished individuals can make exceptional connections. Here you can find women of your choice by sharing your thoughts and opinions You deserve nothing less than extraordinary – find someone born for you.",
  };

  const cookieDataSave = async () => {};

  useEffect(() => {
    setContent(cookie?.description);
  }, [cookie]);

  return (
    <div>
      <Title className="mb-4">Cookie Policy</Title>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={cookieDataSave}
          type="primary"
          htmlType="submit"
          className="bg-primary text-white w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CookiePolicy;
