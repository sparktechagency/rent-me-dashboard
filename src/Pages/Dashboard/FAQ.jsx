import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import Title from "../../components/common/Title";
import {
  useTermsAndConditionQuery,
  useUpdateTermsAndConditionsMutation,
} from "../../redux/apiSlices/termsAndConditionSlice";
import toast from "react-hot-toast";
import rentMeLogo from "../../assets/navLogo.png";
import {
  useFaqQuery,
  useUpdateFaqMutation,
} from "../../redux/apiSlices/faqSlice";

const FAQ = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState("USER");

  useEffect(() => {
    setContent(content);
  }, [selectedTab]);

  const { data: faq, isLoading, refetch } = useFaqQuery(selectedTab);

  const [updateFaq] = useUpdateFaqMutation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <img src={rentMeLogo} alt="" />
      </div>
    );
  }

  const faqData = faq?.content;

  const faqDataSave = async () => {
    const data = {
      content: content,
      userType: selectedTab,
    };

    try {
      const res = await updateFaq(data).unwrap();
      if (res.success) {
        toast.success("FAQ updated successfully");
        setContent(res.data.content);
        refetch();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    }
  };

  const tabContent = {
    USER: faqData,
    VENDOR: faqData,
    CUSTOMER: faqData,
  };

  return (
    <div>
      <Title className="mb-4">Frequently Asked Questions</Title>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "USER" ? "bg-[#FFD900]" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("USER")}
        >
          Users
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "VENDOR" ? "bg-[#FFD900]" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("VENDOR")}
        >
          Vendors
        </button>
        <button
          className={`px-4 rounded-2xl py-2 ${
            selectedTab === "CUSTOMER" ? "bg-[#FFD900]" : "bg-gray-200"
          }`}
          onClick={() => setSelectedTab("CUSTOMER")}
        >
          Customers
        </button>
      </div>

      <JoditEditor
        ref={editor}
        value={tabContent[selectedTab]}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={faqDataSave}
          type="submit"
          className="bg-[#FFD900] w-[160px] h-[42px] rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FAQ;
