import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import init from '@taoqf/react-native-mqtt';

const mqtt = init;

export default function StockPage() {
  const [stock, setStock] = useState({
    light_sensor: 'LOW',
    sugar: 'LOW',
    ice: 'LOW',
    milk: 'LOW',
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const clientId = `stock_mqtt_${Math.random().toString(16).substring(2, 8)}`;

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://10.150.2.255:9001', {
      clientId,
      username: 'bssm_free',
      password: 'bssm_free',
    });

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      mqttClient.subscribe('stock/topic', { qos: 0 });
    });

    mqttClient.on('message', (topic, message) => {
  if (topic === 'stock/topic') {
    try {
      const data = JSON.parse(message.toString());
      console.log('받은 데이터: ', data);

      // 수신된 데이터의 key만 업데이트
      setStock((prevStock) => {
        const updatedStock = { ...prevStock };

        Object.keys(data).forEach((key) => {
          // 현재 관리 중인 재고만 업데이트
          if (updatedStock.hasOwnProperty(key)) {
            updatedStock[key] = data[key].toString().toUpperCase();
          }
        });

        return updatedStock;
      });
    } catch (error) {
      console.log('데이터 파싱 오류: ', error);
    }
  }
});



    mqttClient.on('error', (err) => {
      console.log('Connection error: ', err);
      mqttClient.end();
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const stockData = [
    { key: 'coffee', label: '커피', status: stock.light_sensor },
    { key: 'sugar', label: '설탕', status: stock.sugar },
    { key: 'ice', label: '얼음', status: stock.ice },
    { key: 'milk', label: '우유', status: stock.milk },
  ];

  return (
    <Container>
      <Title>재고 관리</Title>
      <FlatList
        data={stockData}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <StockCard>
            <StockName>{item.label}</StockName>
            <StockStatus isHigh={item.status === 'HIGH'}>
              {item.status}
            </StockStatus>
          </StockCard>
        )}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f4f6f8;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const StockCard = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 6px;
  elevation: 3;
`;

const StockName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;

const StockStatus = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ isHigh }) => (isHigh ? '#28a745' : '#dc3545')};
  background-color: ${({ isHigh }) => (isHigh ? '#d4edda' : '#f8d7da')};
  padding: 8px 16px;
  border-radius: 20px;
  overflow: hidden;
`;

