import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { parse } from 'query-string';

import { Container, Content, AnimationContainer, Background } from './styles';

import Logo from '../../assets/logo.svg';

import { useToast } from '../../hooks/Toast';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const location = useLocation();

  const history = useHistory();

  const { addToast } = useToast();

  interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
  }

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        const { password, password_confirmation } = data;
        const { token } = parse(location.search);

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
          type: 'error',
        });
      }
    },
    [addToast, history, location.search],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={Logo} alt="gobarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input
              icon={FiLock}
              name="password"
              placeholder="Senha"
              type="password"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              placeholder="Confirmação de senha"
              type="password"
            />
            <Button type="submit">Altera senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
