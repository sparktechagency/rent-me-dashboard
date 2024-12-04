import { Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/common/FormItem";

const Login = () => {
  const navigate = useNavigate();
  const [isAgree, setIsAgree] = useState(false); // Track checkbox state

  const onFinish = (values) => {
    console.log("Form Values:", values);
    navigate("/");
  };

  const onCheckboxChange = (e) => {
    setIsAgree(e.target.checked); // Update checkbox state
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-6">Login</h1>
        <p>Please enter your email and password to continue</p>
      </div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          agree: false, // Default state for the checkbox
        }}
      >
        {/* Email Field */}
        <FormItem
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        />

        {/* Password Field */}
        <Form.Item
          name="password"
          label={<p>Password</p>}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{
              height: 40,
              border: "1px solid #d9d9d9",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </Form.Item>

        {/* Terms and Conditions Checkbox */}
        <Form.Item
          name="agree"
          valuePropName="checked"
          style={{ marginBottom: 0 }}
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      "You must agree with the terms and conditions!"
                    ),
            },
          ]}
        >
          <Checkbox onChange={onCheckboxChange} className="text-sm">
            I agree with the Terms and Conditions.
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item style={{ marginBottom: 0 }}>
          <button
            type="submit"
            disabled={!isAgree} // Disable button if checkbox is not checked
            style={{
              width: "100%",
              height: 45,
              fontWeight: 400,
              fontSize: 18,
              marginTop: 20,
            }}
            className={`flex items-center justify-center ${
              isAgree
                ? "bg-[#ffd900] text-black"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } rounded-lg`}
          >
            Sign in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
