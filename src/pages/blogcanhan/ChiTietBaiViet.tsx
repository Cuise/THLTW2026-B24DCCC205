import React, { useEffect, useState } from "react";
import { Button, Tag, Divider, Typography, Space, Card, Empty } from "antd";
import { ArrowLeftOutlined, EyeOutlined, CalendarOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

interface Props {
  postId: string | null;
  onBack: () => void;
}

const ChiTietBaiViet: React.FC<Props> = ({ postId, onBack }) => {
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (postId) {
      
      const savedPosts = JSON.parse(localStorage.getItem("blog_posts") || "[]");
      
    
      const postIndex = savedPosts.findIndex((p: any) => p.id === postId);
      
      if (postIndex !== -1) {
        const foundPost = savedPosts[postIndex];

        
        const updatedPost = { 
          ...foundPost, 
          views: (foundPost.views || 0) + 1 
        };

        
        savedPosts[postIndex] = updatedPost;
        localStorage.setItem("blog_posts", JSON.stringify(savedPosts));

        setPost(updatedPost);
      }
    }
  }, [postId]);

  if (!postId || !post) {
    return <Empty description="Không tìm thấy bài viết" style={{ marginTop: 50 }} />;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
      {/* Nút quay lại trang chủ */}
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={onBack} 
        style={{ marginBottom: 20 }}
      >
        Quay lại danh sách
      </Button>

      <Card bordered={false}>
        <Title level={1}>{post.title}</Title>
        
        <Space size="large" style={{ marginBottom: 16 }}>
          <Text type="secondary"><UserOutlined /> {post.author || "Admin"}</Text>
          <Text type="secondary"><CalendarOutlined /> {post.createdAt}</Text>
          <Text type="secondary"><EyeOutlined /> {post.views} lượt xem</Text>
        </Space>

        <div style={{ marginBottom: 20 }}>
          {post.tags?.map((tag: string) => (
            <Tag color="blue" key={tag} style={{ borderRadius: 10 }}>{tag}</Tag>
          ))}
        </div>

        <Divider />

        {/* Nội dung bài viết */}
        <div style={{ fontSize: "16px", lineHeight: "1.8", minHeight: "300px" }}>
          {post.content ? (
            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
              {post.content}
            </Paragraph>
          ) : (
            <Text type="secondary">Bài viết này chưa có nội dung.</Text>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChiTietBaiViet;