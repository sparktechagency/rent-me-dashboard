import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PersonalInfo = () => {
  const [phone, setPhone] = useState("");
  const [imgURL, setImgURL] = useState(
    "https://avatars.design/wp-content/uploads/2021/02/corporate-avatars-TN-1.jpg"
  );

  const [form] = Form.useForm();

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImgURL(imgUrl);
    }
  };

  const onFinish = (values) => {
    const formData = {
      ...values,
      phone,
    };
    console.log("Form Submitted: ", formData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Link to="/" className="flex items-center gap-[2px] text-base rounded-lg">
        <span>
          <BiLeftArrowAlt size={22} />
        </span>
        <span>Back</span>
      </Link>
      <div className="flex bg-white p-10 mt-10 rounded-2xl border gap-10 w-full">
        <div className="w-8/12">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              name: "John Doe",
              email: "support@learnova.com",
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}
            >
              <Input className="py-3 bg-gray-100 rounded-xl" />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Please enter your phone number",
                },
              ]}
            >
              <PhoneInput
                country="us"
                value={phone}
                onChange={setPhone}
                inputClass="!w-full !px-4 !py-3 !py-5 !ps-12 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-400"
                containerClass="!w-full"
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                block
                style={{
                  width: 178,
                  height: 48,
                  fontWeight: "400px",
                  background: "#FFD900",
                  color: "black",
                }}
                className="roboto-medium mt-10 text-sm leading-4"
              >
                Save and Change
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          <div className="flex flex-col items-center gap-10 bg-slate-100 px-20 py-12 rounded-xl justify-center">
            <input
              onChange={onChangeImage}
              type="file"
              id="img"
              className="hidden"
            />
            <label
              htmlFor="img"
              className="relative w-48 h-48 cursor-pointer rounded-full border border-primary bg-white bg-cover bg-center"
              style={{ backgroundImage: `url(${imgURL})` }}
            >
              <div className="absolute bottom-1 right-1 w-12 h-12 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center">
                <MdOutlineAddPhotoAlternate
                  size={22}
                  className="text-primary"
                />
              </div>
            </label>
            <div className="text-center">
              <h1>Profile</h1>
              <h1 className="text-xl">Admin</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
