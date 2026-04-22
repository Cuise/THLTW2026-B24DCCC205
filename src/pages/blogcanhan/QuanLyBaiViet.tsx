import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input, Select, Popconfirm, Tag, message } from "antd";

const QuanLyBaiViet: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [availableTags, setAvailableTags] = useState<any[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [isModalOpen]); 

  const loadData = () => {
    const savedPosts = localStorage.getItem("blog_posts");
    if (savedPosts) setPosts(JSON.parse(savedPosts));

    const savedTags = localStorage.getItem("blog_tags");
    if (savedTags) setAvailableTags(JSON.parse(savedTags));
  };

  const handleFinish = (values: any) => {
    const savedPosts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
    if (editingId) {
      const newData = savedPosts.map((p: any) => p.id === editingId ? { ...p, ...values } : p);
      localStorage.setItem("blog_posts", JSON.stringify(newData));
      setPosts(newData);
      message.success("Cập nhật bài viết thành công");
    } else {
      const newPost = { 
        ...values, 
        id: Date.now().toString(), 
        views: 0, 
        createdAt: new Date().toLocaleDateString(),
        author: "Minh" 
      };
      const newData = [newPost, ...savedPosts];
      localStorage.setItem("blog_posts", JSON.stringify(newData));
      setPosts(newData);
      message.success("Đã đăng bài viết mới");
    }
    setIsModalOpen(false);
  };

  const deletePost = (id: string) => {
    const newData = posts.filter(p => p.id !== id);
    setPosts(newData);
    localStorage.setItem("blog_posts", JSON.stringify(newData));
    message.success("Đã xóa bài viết");
  };

  return (
    <div>
      <Button type="primary" onClick={() => { setEditingId(null); form.resetFields(); setIsModalOpen(true); }} style={{ marginBottom: 16 }}>
        Viết bài mới
      </Button>
      <Table 
        columns={[
          { title: "Tiêu đề", dataIndex: "title" },
          { title: "Thẻ", dataIndex: "tags", render: (tags: string[]) => tags?.map(t => <Tag key={t} color="blue">{t}</Tag>) },
          { title: "Trạng thái", dataIndex: "status", render: (s: string) => <Tag color={s === "Đã đăng" ? "green" : "orange"}>{s}</Tag> },
          { title: "Thao tác", render: (_, record) => (
            <Space>
              <Button size="small" onClick={() => { setEditingId(record.id); form.setFieldsValue(record); setIsModalOpen(true); }}>Sửa</Button>
              <Popconfirm title="Xác nhận xóa?" onConfirm={() => deletePost(record.id)}><Button size="small" danger>Xóa</Button></Popconfirm>
            </Space>
          )}
        ]} 
        dataSource={posts} 
        rowKey="id" 
      />

      <Modal title={editingId ? "Sửa bài viết" : "Viết bài mới"} visible={isModalOpen} onOk={() => form.submit()} onCancel={() => setIsModalOpen(false)} width={800}>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item name="title" label="Tiêu đề bài viết" rules={[{ required: true }]}><Input /></Form.Item>
          
          <Form.Item name="tags" label="Chọn thẻ (Tags)" rules={[{ required: true, message: 'Vui lòng chọn ít nhất 1 thẻ' }]}>
            <Select mode="multiple" placeholder="Chọn thẻ từ danh sách Quản lý thẻ">
              {availableTags.map(tag => (
                <Select.Option key={tag.id} value={tag.name}>{tag.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="content" label="Nội dung" rules={[{ required: true }]}><Input.TextArea rows={8} /></Form.Item>
          <Form.Item name="status" label="Trạng thái" initialValue="Đã đăng">
            <Select options={[{value: 'Nháp', label: 'Lưu nháp'}, {value: 'Đã đăng', label: 'Xuất bản'}]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyBaiViet;