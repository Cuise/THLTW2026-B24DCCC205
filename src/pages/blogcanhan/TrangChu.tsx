import React, { useState, useEffect } from "react";
import { Row, Col, Card, Input, Tag, Pagination, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;

const TrangChu: React.FC<{ onViewPost: (id: string) => void }> = ({ onViewPost }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("blog_posts");
    if (saved) setPosts(JSON.parse(saved).filter((p: any) => p.status === "Đã đăng"));
  }, []);

  // Logic tìm kiếm với Debounce (giả lập đơn giản)
  const filteredPosts = posts.filter(p => 
    (p.title.toLowerCase().includes(search.toLowerCase())) &&
    (selectedTag ? p.tags.includes(selectedTag) : true)
  );

  const pageSize = 9;
  const currentData = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', gap: 16 }}>
        <Input 
          placeholder="Tìm kiếm bài viết..." 
          prefix={<SearchOutlined />} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ width: 300 }}
        />
        {selectedTag && <Tag closable onClose={() => setSelectedTag(null)}>Tag: {selectedTag}</Tag>}
      </div>

      <Row gutter={[16, 16]}>
        {currentData.map(post => (
          <Col xs={24} sm={12} lg={8} key={post.id}>
            <Card
              hoverable
              cover={<div style={{ height: 160, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Thumbnail</div>}
              onClick={() => onViewPost(post.id)}
            >
              <Card.Meta 
                title={post.title} 
                description={<Paragraph ellipsis={{ rows: 2 }}>{post.summary}</Paragraph>} 
              />
              <div style={{ marginTop: 12 }}>
                <Text type="secondary" style={{ fontSize: 12 }}>{post.createdAt} • {post.author}</Text>
                <div style={{ marginTop: 8 }}>
                  {post.tags.map((tag: string) => (
                    <Tag key={tag} color="blue" onClick={(e) => { e.stopPropagation(); setSelectedTag(tag); }}>{tag}</Tag>
                  ))}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination 
        style={{ marginTop: 24, textAlign: 'center' }} 
        current={currentPage} 
        total={filteredPosts.length} 
        pageSize={pageSize}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default TrangChu;