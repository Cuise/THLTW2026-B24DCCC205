import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Space, Tag, message, Popconfirm, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Text } = Typography;

const QuanLyThe: React.FC = () => {
  const [tags, setTags] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState<any>(null);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = () => {
    const posts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
    const savedTags = JSON.parse(localStorage.getItem("blog_tags") || "[]");
    
    const tagStats = savedTags.map((tag: any) => {
      const count = posts.filter((p: any) => p.tags && p.tags.includes(tag.name)).length;
      return { ...tag, count };
    });
    setTags(tagStats);
  };

  const handleSave = () => {
    if (!tagName.trim()) {
      message.warning("Vui lòng nhập tên thẻ");
      return;
    }
    
    let newTags = JSON.parse(localStorage.getItem("blog_tags") || "[]");
    
    if (currentTag) {
      newTags = newTags.map((t: any) => t.id === currentTag.id ? { ...t, name: tagName.trim() } : t);
      message.success("Cập nhật thẻ thành công");
    } else {
      if (newTags.some((t: any) => t.name.toLowerCase() === tagName.trim().toLowerCase())) {
        message.error("Thẻ này đã tồn tại!");
        return;
      }
      newTags.push({ id: Date.now().toString(), name: tagName.trim() });
      message.success("Đã thêm thẻ mới");
    }

    localStorage.setItem("blog_tags", JSON.stringify(newTags));
    setTagName("");
    setIsModalOpen(false);
    loadTags();
  };

  const deleteTag = (id: string) => {
    const newTags = JSON.parse(localStorage.getItem("blog_tags") || "[]").filter((t: any) => t.id !== id);
    localStorage.setItem("blog_tags", JSON.stringify(newTags));
    loadTags();
    message.success("Đã xóa thẻ");
  };

  const columns = [
    { title: "Tên thẻ", dataIndex: "name", render: (text: string) => <Tag color="blue">{text}</Tag> },
    { title: "Số bài viết", dataIndex: "count", sorter: (a: any, b: any) => a.count - b.count },
    {
      title: "Thao tác",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} onClick={() => { setCurrentTag(record); setTagName(record.name); setIsModalOpen(true); }}>Sửa</Button>
          <Popconfirm title="Xóa thẻ này?" onConfirm={() => deleteTag(record.id)}>
            <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Card>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => { setCurrentTag(null); setTagName(""); setIsModalOpen(true); }} style={{ marginBottom: 16 }}>
        Thêm thẻ mới
      </Button>
      <Table columns={columns} dataSource={tags} rowKey="id" size="small" />
      <Modal title={currentTag ? "Sửa thẻ" : "Thêm thẻ"} visible={isModalOpen} onOk={handleSave} onCancel={() => setIsModalOpen(false)}>
        <div style={{ marginTop: 16 }}>
          <Text>Tên thẻ:</Text>
          <Input value={tagName} onChange={(e) => setTagName(e.target.value)} placeholder="Ví dụ: React, UI/UX..." style={{ marginTop: 8 }} />
        </div>
      </Modal>
    </Card>
  );
};

export default QuanLyThe;