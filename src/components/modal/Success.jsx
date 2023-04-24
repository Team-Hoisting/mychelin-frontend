import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;

  img {
    width: 60px;
  }
`;

const Text = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
`;

const Success = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <img src="/images/success.png" alt="" />
      <Text>투표가 성공적으로 완료되었습니다</Text>
      <Button red thirty onClick={() => navigate('/user')}>
        마이페이지로 이동하기
      </Button>
    </Container>
  );
};

export default Success;