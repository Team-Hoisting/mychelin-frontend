import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userState from '../../recoil/atoms/userState';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  background-color: var(--bg-color);
  color: var(--font-color);

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

const SuccessVerifier = ({ taskQueue }) => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    (() => {
      try {
        setIsLoading(true);

        taskQueue.forEach(async task => {
          const voteStatus = await task();
          setUser(user => ({ ...user, voteStatus }));
        });
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <></>;

  return (
    <Container>
      <img src="/images/success.png" alt="" />
      <Text>투표가 성공적으로 완료되었습니다</Text>
      <Button red thirty onClick={() => navigate(`/profile/${user.nickname}`)}>
        마이페이지로 이동하기
      </Button>
    </Container>
  );
};

export default SuccessVerifier;