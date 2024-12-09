import { Card, Form, Input, Switch, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddBanners = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // Implement your submit logic here
    console.log(values);
  };

  return (
    <Card title="Add Banner" style={{ width: 600, margin: "0 auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter banner title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea placeholder="Enter banner description" />
        </Form.Item>

        <Form.Item
          name="link"
          label="Link"
          rules={[{ required: true, message: "Please input the link!" }]}
        >
          <Input placeholder="Enter banner link" />
        </Form.Item>

        <Form.Item
          name="btnText"
          label="Button Text"
          rules={[{ required: true, message: "Please input the button text!" }]}
        >
          <Input placeholder="Enter button text" />
        </Form.Item>

        <Form.Item
          name="imgUrl"
          label="Image"
          rules={[{ required: true, message: "Please upload the image!" }]}
        >
          <Upload>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="isActive" label="Status" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Banner
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBanners;
