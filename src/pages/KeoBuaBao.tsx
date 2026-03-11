import React, { useState } from "react";
import { Button, Space, Tag, Table, Card } from "antd";

type Choice = "Kéo" | "Búa" | "Bao";

type History = {
  player: Choice;
  computer: Choice;
  result: string;
};

const options: Choice[] = ["Kéo", "Búa", "Bao"];

const KeoBuaBao: React.FC = () => {

  const [result, setResult] = useState("");
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);

  const [stats, setStats] = useState({
    win: 0,
    draw: 0,
    lose: 0,
  });

  const [history, setHistory] = useState<History[]>([]);

  const play = (playerChoice: Choice) => {

    const computer =
      options[Math.floor(Math.random() * options.length)];

    setComputerChoice(computer);

    let gameResult = "";

    if (playerChoice === computer) {
      gameResult = "Hòa";
      setStats((prev) => ({ ...prev, draw: prev.draw + 1 }));
    } 
    else if (
      (playerChoice === "Búa" && computer === "Kéo") ||
      (playerChoice === "Kéo" && computer === "Bao") ||
      (playerChoice === "Bao" && computer === "Búa")
    ) {
      gameResult = "Thắng";
      setStats((prev) => ({ ...prev, win: prev.win + 1 }));
    } 
    else {
      gameResult = "Thua";
      setStats((prev) => ({ ...prev, lose: prev.lose + 1 }));
    }

    setResult(gameResult);

    setHistory([
      { player: playerChoice, computer: computer, result: gameResult },
      ...history,
    ]);
  };

  const resetGame = () => {
    setStats({ win: 0, draw: 0, lose: 0 });
    setHistory([]);
    setResult("");
    setComputerChoice(null);
  };

  const columns = [
    { title: "Người chơi", dataIndex: "player" },
    { title: "Máy", dataIndex: "computer" },
    { title: "Kết quả", dataIndex: "result" ,
        render: (text: string) => {
          let color = "default";
          if (text === "Thắng") color = "green";
          else if (text === "Thua") color = "red";
          else if (text === "Hòa") color = "gold";
          return <Tag color={color}>{text}</Tag>;
        }
    },
  ];

  return (
    <Card title="Trò chơi Oẳn Tù Tì">

      <Space>
        <Button type="primary" onClick={() => play("Kéo")}>Kéo</Button>
        <Button onClick={() => play("Búa")}>Búa</Button>
        <Button onClick={() => play("Bao")}>Bao</Button>
        <Button danger onClick={resetGame}>Reset</Button>
      </Space>

      <div style={{ marginTop: 20 }}>
        {computerChoice && (
          <p>Máy chọn: <b>{computerChoice}</b></p>
        )}

        {result && (
          <p>Kết quả: <b>{result}</b></p>
        )}
      </div>

      <Space size="large" style={{ marginTop: 20 }}>
        <Tag color="green">Thắng: {stats.win}</Tag>
        <Tag color="gold">Hòa: {stats.draw}</Tag>
        <Tag color="red">Thua: {stats.lose}</Tag>
      </Space>

      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        dataSource={history}
        rowKey={(record, index) => index!.toString()}
        pagination={false}
      />
    </Card>
  );
};

export default KeoBuaBao;