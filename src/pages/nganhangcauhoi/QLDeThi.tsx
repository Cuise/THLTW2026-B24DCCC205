import React, { useState } from "react";
import { Button, Card, message } from "antd";

const QLDeThi = () => {

  const [exam, setExam] = useState<any[]>([]);

  const generateExam = () => {

    const questions = JSON.parse(localStorage.getItem("questions") || "[]");

    const easy = questions.filter((q:any)=>q.difficulty==="Dễ").slice(0,2);
    const medium = questions.filter((q:any)=>q.difficulty==="Trung bình").slice(0,2);
    const hard = questions.filter((q:any)=>q.difficulty==="Khó").slice(0,1);
    const veryhard = questions.filter((q:any)=>q.difficulty==="Rất khó").slice(0,1);

    if(easy.length<2 || medium.length<2 || hard.length<1 || veryhard.length<1){
      message.error("Không đủ câu hỏi để tạo đề thi");
      return;
    }

    const newExam = [...easy, ...medium, ...hard, ...veryhard];

    setExam(newExam);
  };

  return (
    <div>

      <Button type="primary" onClick={generateExam}>
        Tạo đề thi
      </Button>

      <div style={{ marginTop: 20 }}>
        {exam.map((q, index) => (
          <Card key={q.id} style={{ marginBottom: 10 }}>
            Câu {index + 1}: {q.content}
          </Card>
        ))}
      </div>

    </div>
  );
};

export default QLDeThi;