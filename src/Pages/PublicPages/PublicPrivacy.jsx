import { Spin, Tabs } from "antd";
import { useTermsAndConditionQuery } from "../../redux/apiSlices/termsAndConditionSlice";
import { useState } from "react";
import { usePrivacyPolicyQuery } from "../../redux/apiSlices/privacyPolicySlice";

const PublicPrivacy = () => {
  const [activeTab, setActiveTab] = useState("USER");
  const { data: terms, isLoading } = usePrivacyPolicyQuery(activeTab);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin />
      </div>
    );
  }

  const termsAndConditions = terms?.content;
  console.log(termsAndConditions);

  const items = [
    {
      key: "USER",
      label: "User Policy",
      children: (
        <div className="prose max-w-none py-8">
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
      ),
    },
    {
      key: "VENDOR",
      label: "Vendor Policy",
      children: (
        <div className="prose max-w-none py-8">
          <div dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="h-[100px] bg-yellow-300 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-center">Privacy Policy</h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs
          items={items}
          defaultActiveKey="user"
          onChange={(key) => setActiveTab(key)}
        />
      </div>
    </div>
  );
};

export default PublicPrivacy;
