import React from 'react';
import { FiPower, FiClock } from 'react-icons/fi';

import { useAuth } from '../../hooks/Auth';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="gobarber-logo" />

          <Profile>
            <img src={user?.avatar_url} alt={user.name} />

            <div>
              <span>Bem vindo,</span>
              <strong>{user?.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>

            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/20422385?s=460&u=a98cd279b99c3074b4a8494de07e575ff663856e&v=4"
                alt="avatar"
              />

              <strong>Douglas Camargo</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
